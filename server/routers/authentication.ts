import { Router } from 'express'
import { check } from 'express-validator'
import validate from '../utils/validation'
import { authenticate, refresh } from '../constrollers/authentication'

const router = Router()

router
  .route('/')
  .post(
    [
      check('email').notEmpty().withMessage('The email is required'),
      check('password').notEmpty().withMessage('The password is required'),
    ],
    validate,
    authenticate
  )

router.route('/refresh').get(refresh)

export default router
