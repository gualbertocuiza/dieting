import request from 'supertest'
import app from '../../app'

describe('/users', () => {
  describe('GET /users', () => {
    it('should return json with a list of users', async () => {
      await request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      await request(app)
        .get('/api/users/1')
        .set('Accept', 'application/json')
        .expect(200)
    })
    it('should return 204 when no user found by ID', async () => {
      await request(app)
        .get('/api/users/123')
        .set('Accept', 'application/json')
        .expect(204)
    })
  })
})
