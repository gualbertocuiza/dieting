import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * /api/ingredients:
 *   get:
 *     tags: [
 *        Ingredients
 *     ]
 *     parameters:
 *       - name: offset
 *         in: query
 *         type: integer
 *         description: The number of items to skip before starting to collect the result set.
 *       - name: limit
 *         in: query
 *         type: integer
 *         description: The maximum numbers of items to return.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '[
 *                          { "id": 1, "name": "chicken", "protein": 15, "carbohydrates": 30, "fats": 18, "calories": 10 }]'
 *
 */
router.route('/').get((req, res) => {
  res.send('list ingredients')
})

/**
 * @openapi
 * /api/ingredients/:id:
 *   get:
 *     tags: [
 *        Ingredients
 *     ]
 *     parameters:
 *       - name: id
 *         in: params
 *         type: integer
 *         description: The id of record to be show.
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "name": "chicken", "protein": 15, "carbohydrates": 30, "fats": 18, "calories": 10 }'
 *
 */
router.route('/:id').get((req, res) => {
  res.send(`show ingredient with id: ${req.params.id}`)
})

/**
 * @openapi
 * /api/ingredients:
 *   post:
 *     tags: [
 *        Ingredients
 *     ]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *                descriptions: The ingredient name
 *              protein:
 *                type: number
 *                required: false
 *                descriptions: The total proteing of the ingredient
 *              carbohydrates:
 *                type: number
 *                required: false
 *                descriptions: The total carbohydrates of the ingredient
 *              fats:
 *                type: number
 *                required: false
 *                descriptions: The total fats of the ingredient
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "name": "chicken", "protein": 15, "carbohydrates": 30, "fats": 18, "calories": 10 }'
 *
 */
router.route('/').post((req, res) => {
  res.send(`create ingredient`)
})

/**
 * @openapi
 * /api/ingredients/:id:
 *   put:
 *     tags: [
 *        Ingredients
 *     ]
 *     parameters:
 *       - name: id
 *         in: params
 *         type: integer
 *         description: The id of record to be updated.
 *     requestBody:
 *       description: can be send any field of created method.
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *                descriptions: The ingredient name
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "name": "chicken", "protein": 15, "carbohydrates": 30, "fats": 18, "calories": 10 }'
 *
 */
router.route('/:id').put((req, res) => {
  res.send(`update ingredient`)
})

/**
 * @openapi
 * /api/ingredients/:id:
 *   delete:
 *     tags: [
 *        Ingredients
 *     ]
 *     parameters:
 *       - name: id
 *         in: params
 *         type: integer
 *         description: The id of record to be deleted.
 *     responses:
 *      204:
 *         description: No Content
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "message": "No Content" }'
 *
 */
router.route('/:id').delete((req, res) => {
  res.send(`delete ingredient`)
})

export default router
