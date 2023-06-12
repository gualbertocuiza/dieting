import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const index = async (req: Request, res: Response) => {
  const users = await prisma.users.findMany({
    select: { id: true, first_name: true, last_name: true, email: true },
  })
  res.status(200).json(users)
}

export const show = async (req: Request, res: Response) => {
  const users = await prisma.users.findUnique({
    where: { id: parseInt(req.params.id) },
    select: { id: true, first_name: true, last_name: true, email: true },
  })
  res.status(200).json(users)
}

export const store = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  await prisma.users.create({
    data: { first_name, last_name, email, password: hashedPassword },
  })
  return res.sendStatus(201)
}

export const update = async (req: Request, res: Response) => {
  await prisma.users.update({
    where: { id: parseInt(req.params.id) },
    data: { ...req.body },
  })
  return res.sendStatus(204)
}

export const destroy = async (req: Request, res: Response) => {
  await prisma.users.delete({ where: { id: parseInt(req.params.id) } })
  return res.sendStatus(204)
}
