import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dieting app',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
}

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./routers/*.ts'],
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))
app.use('/swagger.json', (req, res) => {
  res.json(openapiSpecification).status(200)
})

export default app
