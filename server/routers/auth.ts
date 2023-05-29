import { Router } from 'express'

const router = Router()

router.route('/login').get((req, res) => {
  res.send('login')
})

router.route('/register').post((req, res) => {
  res.send('register')
})

router.route('/logout').get((req, res) => {
  res.send('logout')
})

export default router
