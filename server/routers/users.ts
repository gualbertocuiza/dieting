import { Router } from 'express'
const { body } = require('express-validator')
import validate from '../utils/validation'
import { index, show, store, update, destroy } from '../constrollers/users'

const router = Router()

router.route('/').get(index)

router.route('/:id').get(show)

router.route('/').post(
  [
    body('first_name')
      .isString()
      .isLength({ min: 3 })
      .withMessage('The first_name must have minimum length of 3')
      .trim(),
    body('last_name')
      .isString()
      .isLength({ min: 3 })
      .withMessage('The last_name must have minimum length of 3')
      .trim(),
    body('password').isString().withMessage('The password is required'),
    //.isLength({ min: 8, max: 15 })
    //.withMessage('The password must have min and max length between 8-15')
    //.matches(/\d/)
    //.withMessage('The password must have at least one number')
    //.matches(/[!@#$%^&*(),.?":{}|<>]/)
    //.withMessage('The password must have at least one special character'),
  ],
  validate,
  store
)

router
  .route('/:id')
  .put(
    [
      body('first_name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('The first_name must have minimum length of 3')
        .trim(),
      body('last_name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('The last_name must have minimum length of 3')
        .trim(),
    ],
    update
  )

router.route('/:id').delete(destroy)

export default router
