// to setup a forin key relationship between the data the key MUST BE <collection>_id

import users from './db-users.js'
import posts from './db-posts.js'
import comments from './db-comments.js'

const data = {
  users,
  posts,
  comments
}

export default data
