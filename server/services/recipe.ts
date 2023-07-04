import prisma from '../utils/prisma'

export const getRecipes = async () => {
  return await prisma.recipes.findMany()
}

export const getRecipe = async (id: number) => {
  return await prisma.recipes.findUnique({
    where: { id },
  })
}

export const storeRecipe = async (newData) => {
  return await prisma.recipes.create({
    data: { ...newData },
  })
}

export const updateRecipe = async (id: number, newData: {}) => {
  return await prisma.recipes.update({
    where: { id },
    data: { ...newData },
  })
}

export const deleteRecipe = async (id: number) => {
  return await prisma.recipes.delete({ where: { id } })
}
