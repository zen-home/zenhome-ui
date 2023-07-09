const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schemaComposer } = require('graphql-compose');
const http = require('http');
const httpProxy = require('http-proxy');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Import the database
const db = require('./db');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv)).argv;

// Create a proxy server
const proxy = httpProxy.createProxyServer();

const target = argv.upstreamUrl || 'https://example.com/graphql'

const relationships = {};

for (let key in db) {
  if (db[key].length > 0) {
    for (let subKey in db[key][0]) {
      if (subKey.endsWith('_id')) {
        const relatedType = subKey.slice(0, -3);
        if (!relationships[relatedType]) {
          relationships[relatedType] = {};
        }
        relationships[relatedType][key] = {
          type: key.charAt(0).toUpperCase() + key.slice(1, -1),
          foreignKey: subKey
        };
      }
    }
  }
}

/**
 * Converts JavaScript types to GraphQL types.
 *
 * @param {any} value - The value to convert.
 * @returns {string} The GraphQL type.
 */
const convertType = (value) => {
  if (value === null) {
    return 'String';
  }

  switch (typeof value) {
    case 'number':
      return 'Int';
    case 'boolean':
      return 'Boolean';
    case 'string':
      return 'String';
    case 'object':
      if (value instanceof Date) {
        return 'Date';
      } else if (Array.isArray(value)) {
        return '[String]';
      } else {
        return 'JSON';
      }
    default:
      return 'String';
  }
};

/**
 * Generates GraphQL types and resolvers from the database.
 */
const generateSchema = () => {
  for (let key in db) {
    if (key === 'relationships') continue;

    if (db[key].length > 0) {
      let fields = {};
      for (let subKey in db[key][0]) {
        fields[subKey] = convertType(db[key][0][subKey]);
      }

      const TC = schemaComposer.createObjectTC({
        name: key.charAt(0).toUpperCase() + key.slice(1, -1),
        fields,
      });

      schemaComposer.Query.addFields({
        [key]: {
          type: `[${TC.getTypeName()}]`,
          resolve: () => db[key],
        },
      });

      if (relationships[key]) {
        for (let relKey in relationships[key]) {
          const rel = relationships[key][relKey];
          TC.addFields({
            [relKey]: {
              type: `[${rel.type}]`,
              resolve: (source) => db[rel.type.toLowerCase() + 's'].filter((item) => item[rel.foreignKey] === source.id),
            },
          });
        }
      }
    }
  }
};

/**
 * Handles post requests to the GraphQL endpoint.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} body
 */
const handlePostRequest = (req, res, body) => {
  // Check if the body is not empty and contains a valid JSON object
  if (body && body.startsWith('{') && body.endsWith('}')) {
    const { query } = JSON.parse(body);

    // Check if the query or mutation is in the schema
    const document = gql`${query}`;
    const operationName = document.definitions[0].name.value;
    const canHandleRequest = !!schema.getQueryType().getFields()[operationName];

    if (!canHandleRequest) {
      // Forward the request to the upstream URL
      proxy.web(req, res, { target });
    }
  } else {
    // If the body is empty or doesn't contain a valid JSON object, forward the request to the upstream URL
    proxy.web(req, res, { target });
  }
}


try {
  generateSchema();
} catch (error) {
  console.error('Error generating schema:', error);
}

const schema = schemaComposer.buildSchema();


const server = new ApolloServer({
  schema,
  introspection: true, // Enable introspection to get the schema
  playground: true, // Enable the playground to test your queries
});

const app = express();

// Start the server before applying middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  app.use((req, res, next) => {
    if (req.method === 'POST') {
      // If the request is a POST request, parse it to get the GraphQL query or mutation
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        handlePostRequest(req, res, body);
      });
    } else {
      next();
    }
  });

  app.listen({ port: 8000 }, () =>
    console.log(`🎭️ 🚀 Mock Server ready at http://localhost:8000${server.graphqlPath}`)
  );
});
