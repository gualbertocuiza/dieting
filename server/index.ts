import express, { json, urlencoded, Request, Response } from 'express'
import { verifyToken } from './middlewares/authentication'
import routers from './routers'
import swagger from './routers/swagger'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => res.send('Hello World'))

app.use(swagger)
app.all('*', verifyToken)
app.use('/api', routers)

app.listen(port, () => console.log(`Application started on port: ${port}`))
