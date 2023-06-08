import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * /api/comments:
 *   get:
 *     tags: [
 *        Comments
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
 *                          { "id": 1, "comment": "Delicious, hightly recommended", "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }]'
 *
 */
router.route('/').get((req, res) => {
  res.send('list comments')
})

/**
 * @openapi
 * /api/comments/:id:
 *   get:
 *     tags: [
 *        Comments
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
 *                         value: '{ "id": 1, "comment": "Delicious, hightly recommended", "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }'
 *
 */
router.route('/:id').get((req, res) => {
  res.send(`show comment with id: ${req.params.id}`)
})

/**
 * @openapi
 * /api/comments:
 *   post:
 *     tags: [
 *        Comments
 *     ]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comment:
 *                type: string
 *                required: true
 *                descriptions: The comment/feedback for the recipe
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "comment": "Delicious, hightly recommended", "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }'
 *
 */
router.route('/').post((req, res) => {
  res.send(`create comment`)
})

/**
 * @openapi
 * /api/comments/:id:
 *   put:
 *     tags: [
 *        Comments
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
 *              comment:
 *                type: string
 *                required: true
 *                descriptions: The comment/feedback for the recipe
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "comment": "Delicious, hightly recommended", "created_at": "2 hours ago", "user": { "name": "Jhon", "avatar": "https://dieting.com/storage/35435634.png" }'
 *
 */
router.route('/:id').put((req, res) => {
  res.send(`update comment`)
})

/**
 * @openapi
 * /api/comments/:id:
 *   delete:
 *     tags: [
 *        Comments
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
  res.send(`delete comment`)
})

export default router
