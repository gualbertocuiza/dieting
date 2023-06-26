import request from 'supertest'
import app from '../index'

describe('/users', () => {
  describe('GET /users', () => {
    it('should return json with a list of users', async () => {
      await request(app)
        .get('/api/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(404)
    })
  })
})
