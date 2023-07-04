import request from 'supertest'
import app from '../../app'

describe('/recipes', () => {
  describe('GET /recipes', () => {
    it('should return json with a list of recipes', async () => {
      await request(app)
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
  describe('GET /recipes/:id', () => {
    it('should return a recipe by ID', async () => {
      await request(app)
        .get('/api/recipes/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
    it('should return 204 when no recipe found by ID', async () => {
      await request(app)
        .get('/api/recipes/123')
        .set('Accept', 'application/json')
        .expect(204)
    })
  })
  describe('POST /recipes', () => {
    const recipe = {
      first_name: 'Gcuiza',
      last_name: 'Cuiza',
      email: 'gcuiza@unos.com',
      password: 'password',
    }
    it('should return 201 and create a new recipe', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send(recipe)
        .expect(201)
    })
    it('should return 400 if first name is null', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send({ ...recipe, first_name: '' })
        .expect(400)
    })
    it('should return 400 if first name has less than three characters', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send({ ...recipe, first_name: 'Gu' })
        .expect(400)
    })
    it('should return 400 if last name is null', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send({ ...recipe, last_name: '' })
        .expect(400)
    })
    it('should return 400 if last name has less than three characters', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send({ ...recipe, last_name: 'Cu' })
        .expect(400)
    })
  })
  describe('DELETE /recipes/:id', () => {
    it('should return 204 and delete the found recipe', async () => {
      await request(app)
        .delete('/api/recipes/1')
        .set('Accept', 'application/json')
        .expect(204)
    })
  })
})
