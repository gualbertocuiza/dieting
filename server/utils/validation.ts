import { validationResult } from 'express-validator'

const validate = (req, res, next) => {
  const error = validationResult(req)
  const hasError = !error.isEmpty()

  if (hasError) {
    res.status(400).json({ error: error.array({ onlyFirstError: true }) })
  } else {
    next()
  }
}

export default validate
