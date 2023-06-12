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
        accessToken: generateToken(user.id),
        refreshToken: generateRefreshToken(user.id),
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
      accessToken: generateToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    })
  }
  return res.sendStatus(401)
}

const generateToken = (id: number) => {
  return jwt.sign({ sub: id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  })
}

const generateRefreshToken = (id: number) => {
  return jwt.sign({ sub: id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  })
}
