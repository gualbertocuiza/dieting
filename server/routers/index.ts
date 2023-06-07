import express from 'express'
import authRouter from './auth'
import recipeRouter from './recipes'

const routers = express()

routers.use('/auth', authRouter)
routers.use('/recipes', recipeRouter)

export default routers
