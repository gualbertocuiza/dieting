import express, { json, urlencoded, Request, Response } from 'express'
import { verifyToken } from './middlewares/authentication'
import routers from './routers'
import swagger from './routers/swagger'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => res.send('Hello World'))

app.use(swagger)
app.all('*', verifyToken)
app.use('/api', routers)

export default app
