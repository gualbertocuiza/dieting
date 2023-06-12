import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if you want to skip any APIs put them here.
  if (
    (req.path === '/api/authentication' || req.path === '/api/users') &&
    req.method == 'POST'
  )
    return next()

  const token = req.headers.authorization

  if (token) {
    try {
      const tokenVerified = jwt.verify(
        token,
        req.path === '/api/authentication/refresh'
          ? 'refreshJWTSecret'
          : 'accessJWTSecret'
      )

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub
        return next()
      }
    } catch (e) {
      console.log(`Token expired for user ${token.sub}`)
    }
  }
  return res.sendStatus(401)
}
