import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async () => {
  return await prisma.users.findMany({
    select: { id: true, first_name: true, last_name: true, email: true },
  })
}

export const getUser = async (id: number) => {
  return await prisma.users.findUnique({
    where: { id },
    select: { id: true, first_name: true, last_name: true, email: true },
  })
}

export const storeUser = async (newData) => {
  return await prisma.users.create({
    data: { ...newData },
  })
}

export const updateUser = async (id: number, newData: {}) => {
  return await prisma.users.update({
    where: { id },
    data: { ...newData },
  })
}

export const deleteUser = async (id: number) => {
  return await prisma.users.delete({ where: { id } })
}
