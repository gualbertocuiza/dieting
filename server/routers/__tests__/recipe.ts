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
      name: 'Honey garlic chicken',
      description: 'Step 1...',
      user_id: 1,
      type_id: 1,
    }
    it('should return 201 and create a new recipe', async () => {
      await request(app)
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send(recipe)
        .expect(201)
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
