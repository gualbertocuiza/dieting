import httpMocks, { createResponse, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import { when } from 'jest-when'
import {
  getUsers,
  getUser,
  storeUser,
  updateUser,
  deleteUser,
} from '../../services/user'
import { index, show, store, update, destroy } from '../users'

jest.mock('../../services/user')
jest.mock('@prisma/client')

describe('User controller', () => {
  describe('List users', () => {
    it('should return status 200 with a list of users', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/',
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = [
        {
          id: 1,
          first_name: 'Jhon',
          last_name: 'Test',
          avatar: 'https://dieting.com/storage/4353466.png',
          created_at: '2023-26-05 10:27:21.532056',
          email: 'jhon.test@unosquare.com',
        },
        {
          id: 2,
          first_name: 'Julia',
          last_name: 'Test',
          avatar: 'https://dieting.com/storage/4353466.png',
          created_at: '2023-26-05 10:27:21.532056',
          email: 'julia.test@unosquare.com',
        },
      ]
      when(getUsers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await index(request, response)

      expect(response._getStatusCode()).toEqual(200)
      expect(response._getJSONData().length).toEqual(2)
    })
    it('should return error message when an error ecours', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/',
      })
      const response: MockResponse<Response> = createResponse()

      when(getUsers)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await index(request, response)

      expect(response._getStatusCode()).toEqual(500)
    })
  })
  describe('find an user', () => {
    it('should return status 200 with the found user', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/1',
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        first_name: 'Jhon',
        last_name: 'Test',
        avatar: 'https://dieting.com/storage/4353466.png',
        created_at: '2023-26-05 10:27:21.532056',
        email: 'jhon.test@unosquare.com',
      }

      when(getUser)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await show(request, response)

      expect(response._getStatusCode()).toEqual(200)
      expect(response._getJSONData().id).toEqual(1)
    })
    it('should return status 204 when there is no user with the sent ID', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/5',
        params: { id: 5 },
      })
      const response: MockResponse<Response> = createResponse()
      when(getUser).calledWith(5).mockImplementationOnce(null)
      await show(request, response)

      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return error message when an error ecours', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/',
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()

      when(getUser)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })
      await show(request, response)

      expect(response._getStatusCode()).toEqual(500)
    })
  })
  /*describe('create user', () => {
    const createBody = {
      first_name: 'Jhon',
      last_name: 'Test',
      email: 'jhon.test@unosquare.com',
      password: 'password',
    }
    it('should return status 201 and create a new user', async () => {
      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: createBody,
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        first_name: 'Jhon',
        last_name: 'Test',
        email: 'jhon.test@unosquare.com',
        created_at: '2023-26-05 10:27:21.532056',
      }
      when(storeUser)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await store(request, response)

      expect(response._getStatusCode()).toEqual(201)
    })
  })*/
  describe('update user', () => {
    const updateBody = {
      first_name: 'John updated',
    }
    it('should return status 200 and update the found user', async () => {
      const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/1',
        body: updateBody,
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      const returnValue = {
        id: 1,
        first_name: 'Jhon updated',
        last_name: 'Test',
        avatar: 'https://dieting.com/storage/4353466.png',
        created_at: '2023-26-05 10:27:21.532056',
        email: 'jhon.test@unosquare.com',
      }
      when(updateUser)
        .calledWith(1, updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue))

      await update(request, response)

      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return status 500 when an error occurs', async () => {
      const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/1',
        body: updateBody,
        params: { id: 1 },
      })
      const response: MockResponse<Response> = createResponse()
      when(updateUser)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await update(request, response)
      expect(response._getStatusCode()).toEqual(500)
    })
  })
  describe('delete user', () => {
    it('should return 204 when delete a user successfully', async () => {
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/users/1',
        params: {
          id: 1,
        },
      })
      const response: MockResponse<Response> = createResponse()
      when(deleteUser).calledWith(1).mockReturnValueOnce(Promise.resolve(true))

      await destroy(request, response)
      expect(response._getStatusCode()).toEqual(204)
    })
    it('should return 500 when occurs an error', async () => {
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/users/1',
        params: {
          id: null,
        },
      })
      const response: MockResponse<Response> = createResponse()
      when(deleteUser)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error('Something when wrong, please try again latter!')
        })

      await destroy(request, response)
      expect(response._getStatusCode()).toEqual(500)
    })
  })
})
