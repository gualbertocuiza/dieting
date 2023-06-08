import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * /api/ratings:
 *   get:
 *     tags: [
 *        Ratings
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
 *                          { "id": 1, "rating": 3, "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }]'
 *
 */
router.route('/').get((req, res) => {
  res.send('list ratings')
})

/**
 * @openapi
 * /api/ratings/:id:
 *   get:
 *     tags: [
 *        Ratings
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
 *                         value: '{ "id": 1, "rating": 3, "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }'
 *
 */
router.route('/:id').get((req, res) => {
  res.send(`show rating with id: ${req.params.id}`)
})

/**
 * @openapi
 * /api/ratings:
 *   post:
 *     tags: [
 *        Ratings
 *     ]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              rating:
 *                type: float
 *                required: true
 *                descriptions: The rating 1-5 for the recipe
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "rating": 3, "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }'
 *
 */
router.route('/').post((req, res) => {
  res.send(`create rating`)
})

/**
 * @openapi
 * /api/ratings/:id:
 *   delete:
 *     tags: [
 *        Ratings
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
  res.send(`delete rating`)
})

export default router
