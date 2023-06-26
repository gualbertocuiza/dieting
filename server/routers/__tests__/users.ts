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
        .expect('Content-Type', /json/)
        .expect(200)
    })
    it('should return 204 when no user found by ID', async () => {
      await request(app)
        .get('/api/users/123')
        .set('Accept', 'application/json')
        .expect(204)
    })
  })
  describe('POST /users', () => {
    const user = {
      first_name: 'Gcuiza',
      last_name: 'Cuiza',
      email: 'gcuiza@unos.com',
      password: 'password',
    }
    it('should return 201 and create a new user', async () => {
      await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
    })
    it('should return 400 if first name is null', async () => {
      await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send({ ...user, first_name: '' })
        .expect(400)
    })
    it('should return 400 if first name has less than three characters', async () => {
      await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send({ ...user, first_name: 'Gu' })
        .expect(400)
    })
    it('should return 400 if last name is null', async () => {
      await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send({ ...user, last_name: '' })
        .expect(400)
    })
    it('should return 400 if last name has less than three characters', async () => {
      await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send({ ...user, last_name: 'Cu' })
        .expect(400)
    })
  })
  describe('DELETE /users/:id', () => {
    it('should return 204 and delete the found user', async () => {
      await request(app)
        .delete('/api/users/1')
        .set('Accept', 'application/json')
        .expect(204)
    })
  })
})
