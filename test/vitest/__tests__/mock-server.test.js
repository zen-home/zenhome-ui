import { describe, expect, it } from 'vitest'
const request = require('supertest')
const { app, startServer } = require('../../../mock/graphql/server')
startServer()
describe('Server and handlePostRequest tests', () => {
  it('should handle valid POST request', async () => {
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
