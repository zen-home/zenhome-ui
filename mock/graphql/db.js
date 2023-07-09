// to setup a forin key relationship between the data the key MUST BE <collection>_id

const users = require('./db-users');
const posts = require('./db-posts')
const comments = require('./db-comments')

const data = { posts, users, comments };

module.exports = { ...data };
