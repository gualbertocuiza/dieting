import { Request, Response } from 'express'
import {
  getRecipes,
  getRecipe,
  storeRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipe'

export const index = async (req: Request, res: Response) => {
  try {
    const recipes = await getRecipes()
    res.status(200).json(recipes)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const recipe = await getRecipe(parseInt(req.params.id))
    if (recipe) {
      return res.status(200).json(recipe)
    }
    return res.sendStatus(204)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}

export const store = async (req: Request, res: Response) => {
  const recipeCreated = await storeRecipe(req.body)
  if (!recipeCreated) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  return res.sendStatus(201)
}

export const update = async (req: Request, res: Response) => {
  const updatedRecipe = await updateRecipe(parseInt(req.params.id), req.body)
  if (!updatedRecipe) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
  return res.sendStatus(204)
}

export const destroy = async (req: Request, res: Response) => {
  try {
    await deleteRecipe(parseInt(req.params.id))
    return res.sendStatus(204)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}
