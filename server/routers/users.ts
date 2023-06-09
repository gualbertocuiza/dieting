import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.route('/').get(async (req, res) => {
  const users = await prisma.users.findMany({
    select: { id: true, first_name: true, last_name: true, email: true },
  })
  res.status(200).json(users)
})

router.route('/:id').get(async (req, res) => {
  const users = await prisma.users.findUnique({
    where: { id: parseInt(req.params.id) },
    select: { id: true, first_name: true, last_name: true, email: true },
  })
  res.status(200).json(users)
})

router.route('/').post(async (req, res) => {
  await prisma.users.create({
    data: { ...req.body },
  })
  return res.sendStatus(201)
})

router.route('/:id').put(async (req, res) => {
  await prisma.users.update({
    where: { id: parseInt(req.params.id) },
    data: { ...req.body },
  })
  return res.sendStatus(204)
})

router.route('/:id').delete(async (req, res) => {
  await prisma.users.delete({ where: { id: parseInt(req.params.id) } })
  return res.sendStatus(204)
})

export default router
