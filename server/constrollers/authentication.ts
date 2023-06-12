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
        accessToken: generateToken(
          user.id,
          process.env.ACCESS_JWT_SECRET,
          parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
        ),
        refreshToken: generateToken(
          user.id,
          process.env.REFRESH_JWT_SECRET,
          parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
        ),
      })
    }
  }
  return res.sendStatus(401)
}

export const refresh = async (req: Request, res: Response) => {
  const userId = res.locals.userId as number
  var user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  })
  if (user) {
    return res.status(200).json({
      accessToken: generateToken(
        user.id,
        process.env.ACCESS_JWT_SECRET,
        parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
      ),
      refreshToken: generateToken(
        user.id,
        process.env.REFRESH_JWT_SECRET,
        parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
      ),
    })
  }
  return res.sendStatus(401)
}

const generateToken = (id: number, key: string, expireTime: number) => {
  return jwt.sign({ sub: id }, key, {
    expiresIn: expireTime,
  })
}
