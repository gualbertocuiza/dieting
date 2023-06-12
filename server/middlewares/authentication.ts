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
      const tokenVerified = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
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
