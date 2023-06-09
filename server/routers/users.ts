import { Router } from 'express'
import { index, show, store, update, destroy } from '../constrollers/users'

const router = Router()

router.route('/').get(index)

router.route('/:id').get(show)

router.route('/').post(store)

router.route('/:id').put(update)

router.route('/:id').delete(destroy)

export default router
