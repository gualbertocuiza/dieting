import { Request, Response, NextFunction } from 'express'
import { getUser } from '../services/user'

export const verifyAuthorize = (...requiredRoles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(res.locals.userId)
    const hasRole = requiredRoles.includes('') //(user.role)
    if (!hasRole) {
      return res.status(403).json({
        error: 'Not authorized',
      })
    }
    return next()
  }
}
