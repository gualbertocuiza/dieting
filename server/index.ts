import express, { Request, Response } from 'express'
import routers from './routers'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => res.send('Hello World'))

app.use(routers)

app.listen(port, () => console.log(`Application started on port: ${port}`))
