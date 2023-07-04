import httpMocks, { createResponse, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import { when } from 'jest-when'
import {
  getRecipes,
  getRecipe,
  storeRecipe,
  updateRecipe,
  deleteRecipe,
} from '../../services/recipe'
import { index, show, store, update, destroy } from '../recipes'

jest.mock('../../services/recipe')
jest.mock('@prisma/client')

describe('Recipes controller', () => {
  describe('List recipes', () => {
    it('should return status 200 with a list of recipes', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/recipes/',
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = [
        {
          id: 1,
          title: 'Honey garlic chicken',
          created_at: '2023-26-05 10:27:21.532056',
          photo: 'https://dieting.com/storage/35435634.png',
          rating_avg: 4.5,
          comments: 5,
          type: 'Low-fat diet',
          nutriends: {
            protein: 25,
            carbohydrates: 40,
            fats: 15,
            calories: 200,
          },
        },
        {
          id: 2,
          title: 'Crispy BBQ tofu sandwich',
          created_at: '2023-26-05 10:27:21.532056',
          photo: 'https://dieting.com/storage/35435634.png',
          rating_avg: 4,
          comments: 10,
          type: 'Vegan',
          nutriends: {
            protein: 20,
            carbohydrates: 40,
            fats: 15,
            calories: 200,
          },
        },
      ]
      when(getRecipes)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await index(request, response)

      expect(response._getStatusCode()).toEqual(200)
      expect(response._getJSONData().length).toEqual(2)
    })
    it('should return error message when an error ecours', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/recipes/',
      })
      const response: MockResponse<Response> = createResponse()

      when(getRecipes)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await index(request, response)

      expect(response._getStatusCode()).toEqual(500)
    })
  })
  describe('find an recipe', () => {
    it('should return status 200 with the found recipe', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/recipes/1',
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        title: 'Honey garlic chicken',
        created_at: '2023-26-05 10:27:21.532056',
        photo: 'https://dieting.com/storage/35435634.png',
        rating_avg: 4.5,
        comments: 5,
        type: 'Low-fat diet',
        nutriends: {
          protein: 25,
          carbohydrates: 40,
          fats: 15,
          calories: 200,
        },
      }

      when(getRecipe)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await show(request, response)

      expect(response._getStatusCode()).toEqual(200)
      expect(response._getJSONData().id).toEqual(1)
    })
    it('should return status 204 when there is no recipe with the sent ID', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/recipes/5',
        params: { id: 5 },
      })
      const response: MockResponse<Response> = createResponse()
      when(getRecipe).calledWith(5).mockImplementationOnce(null)
      await show(request, response)

      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return error message when an error ecours', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/recipes/7',
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()

      when(getRecipe)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })
      await show(request, response)

      expect(response._getStatusCode()).toEqual(500)
    })
  })
  describe('create recipe', () => {
    const createBody = {
      title: 'Honey garlic chicken',
      description: 'Step 1: ...',
      type: 1,
      nutriends: {
        protein: 25,
        carbohydrates: 40,
        fats: 15,
        calories: 200,
      },
    }
    it('should return status 201 and create a new recipe', async () => {
      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/recipes',
        body: createBody,
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        title: 'Honey garlic chicken',
        description: 'Step 1: ...',
        type: 1,
        nutriends: {
          protein: 25,
          carbohydrates: 40,
          fats: 15,
          calories: 200,
        },
      }
      when(storeRecipe)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await store(request, response)

      expect(response._getStatusCode()).toEqual(201)
    })
  })
  describe('update recipe', () => {
    const updateBody = {
      title: 'Honey garlic chicken v1',
    }
    it('should return status 200 and update the found recipe', async () => {
      const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/recipes/1',
        body: updateBody,
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        title: 'Honey garlic chicken',
        description: 'Step 1: ...',
        type: 1,
        nutriends: {
          protein: 25,
          carbohydrates: 40,
          fats: 15,
          calories: 200,
        },
      }
      when(updateRecipe)
        .calledWith(1, updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await update(request, response)

      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return status 500 when an error occurs', async () => {
      const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/recipes/1',
        body: updateBody,
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      when(updateRecipe)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await update(request, response)
      expect(response._getStatusCode()).toEqual(500)
    })
  })

  describe('delete recipe', () => {
    it('should return 204 when delete a recipe successfully', async () => {
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/recipes/1',
        params: {
          id: 1,
        },
      })
      const response: MockResponse<Response> = createResponse()
      when(deleteRecipe)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(true))

      await destroy(request, response)
      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return 500 when occurs an error', async () => {
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/recipes/1',
        params: {
          id: null,
        },
      })
      const response: MockResponse<Response> = createResponse()
      when(deleteRecipe)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await destroy(request, response)
      expect(response._getStatusCode()).toEqual(500)
    })
  })
})
