import express from 'express'
import userRouter from './users'
import recipeRouter from './recipes'
import ingredientRouter from './ingredients'
import commentRouter from './comments'
import ratingRouter from './ratings'
import authRouter from './authentication'

const routers = express()

routers.use('/users', userRouter)
routers.use('/recipes', recipeRouter)
routers.use('/ingredients', ingredientRouter)
routers.use('/comments', commentRouter)
routers.use('/ratings', ratingRouter)
routers.use('/authentication', authRouter)

export default routers
