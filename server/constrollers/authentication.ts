import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  })
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password)
    if (passwordCorrect) {
      return res.status(200).json({
        accessToken: jwt.sign({ sub: user.id }, 'accessJWTSecret', {
          expiresIn: 1200,
        }),
        refreshToken: jwt.sign({ sub: user.id }, 'refreshJWTSecret', {
          expiresIn: 1209600,
        }),
      })
    }
  }
  return res.sendStatus(401)
}

export const refresh = async (req: Request, res: Response) => {
  const userId = res.locals.user as number
  var user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  })
  if (user) {
    return res.status(200).json({
      accessToken: jwt.sign({ sub: user.id }, 'accessJWTSecret', {
        expiresIn: 1200,
      }),
      refreshToken: jwt.sign({ sub: user.id }, 'refreshJWTSecret', {
        expiresIn: 1209600,
      }),
    })
  }
  return res.sendStatus(401)
}
