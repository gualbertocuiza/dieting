import express from 'express'
import authRouter from './auth'
import recipeRouter from './recipes'

const routers = express()

routers.use('/api', authRouter)
routers.use('/api', recipeRouter)

export default routers
