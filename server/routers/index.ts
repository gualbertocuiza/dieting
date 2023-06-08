import express from 'express'
import authRouter from './auth'
import recipeRouter from './recipes'
import ingredientRouter from './ingredients'
import commentRouter from './comments'
import ratingRouter from './ratings'

const routers = express()

routers.use('/auth', authRouter)
routers.use('/recipes', recipeRouter)
routers.use('/ingredients', ingredientRouter)
routers.use('/comments', commentRouter)
routers.use('/ratings', ratingRouter)

export default routers
