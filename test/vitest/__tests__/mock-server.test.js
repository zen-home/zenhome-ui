import { describe, expect, it } from 'vitest'
const request = require('supertest')
const { server, app } = require('../../../mock/graphql/server')

describe('Server and handlePostRequest tests', () => {
  it('should handle valid POST request', async () => {
    console.log('server.graphqlPath', server.graphqlPath)
    const query = {
      query: `query Users {
        users {
          name
          id
          posts {
            id
            comments { body date id posts_id }
            title
            users_id
            views
          }
        }
      }`
    }

    const response = await request(app)
      .post('/graphql')
      .send(query)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.users') // Update this accordingly
  })
})
