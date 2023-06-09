import express, { json, urlencoded, Request, Response } from 'express'
import routers from './routers'
import swagger from './routers/swagger'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => res.send('Hello World'))

app.use('/api', routers)
app.use(swagger)

app.listen(port, () => console.log(`Application started on port: ${port}`))
