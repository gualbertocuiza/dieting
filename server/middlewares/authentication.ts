import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const handleTest = (res, next) => {
  res.locals.userId = 1
  return next()
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'test') return handleTest(res, next)
  // if you want to skip any APIs put them here.
  if (
    (req.path === '/api/authentication' || req.path === '/api/users') &&
    req.method == 'POST'
  )
    return next()

  const token = req.headers.authorization

  if (token) {
    try {
      const tokenVerified = jwt.verify(token, 'accessJWTSecret')
      if (tokenVerified) {
        res.locals.userId = tokenVerified.sub
        return next()
      }
    } catch (e) {
      console.log(`Token expired for user ${token.sub}`)
    }
  }
  return res.sendStatus(401)
}
