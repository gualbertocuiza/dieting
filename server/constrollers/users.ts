import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  getUsers,
  getUser,
  storeUser,
  updateUser,
  deleteUser,
} from '../services/user'

export const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers()
    res.status(200).json(users)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const user = await getUser(parseInt(req.params.id))
    if (user) {
      return res.status(200).json(user)
    }
    return res.sendStatus(204)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}

export const store = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const data = { first_name, last_name, email, password: hashedPassword }
  const userCreated = await storeUser(data)
  if (!userCreated) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  return res.sendStatus(201)
}

export const update = async (req: Request, res: Response) => {
  const updatedUser = await updateUser(parseInt(req.params.id), req.body)
  if (!updatedUser) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
  return res.sendStatus(204)
}

export const destroy = async (req: Request, res: Response) => {
  try {
    await deleteUser(parseInt(req.params.id))
    return res.sendStatus(204)
  } catch (error) {
    return res
      .status(500)
      .json({ error, msj: 'Something when wrong, please try again latter!' })
  }
}
