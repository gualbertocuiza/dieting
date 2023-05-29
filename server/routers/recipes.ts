import { Router } from 'express'

const router = Router()

router.route('/recipes').get((req, res) => {
  res.send('list recipes')
})

router.route('/recipes/:id').get((req, res) => {
  res.send(`show recipe with id: ${req.params.id}`)
})

export default router
