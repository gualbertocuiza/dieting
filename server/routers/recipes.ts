import { Router } from 'express'
import { body } from 'express-validator'
import validate from '../utils/validation'
import { index, show, store, update, destroy } from '../constrollers/recipes'

const router = Router()

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     tags: [
 *        Recipes
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
 *                          { "id": 1, "firstName": "Sundar", "lastName": "Pichai", "displayImageUrl": https://thispersondoesnotexist.com/image, "email": sundar.pichai@google.com, "phone": "0800001066", "jobTitle": "CEO", "role": { "id": 1, "description": "Admin" } }, { "id": 2, "firstName": "Matt", "lastName": "Cutts", "displayImageUrl": https://thispersondoesnotexist.com/image, "email": matt.cutts@google.com, "phone": "0800001066", "jobTitle": "Software Dev", "role": { "id": 2, "description": "Sales Rep" } }]'
 *
 */
router.route('/').get(index)

/**
 * @openapi
 * /api/recipes/:id:
 *   get:
 *     tags: [
 *        Recipes
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
 *                         value: '{ "id": 1, "title": "Honey garlic chicken", "created_at": "2023-26-05 10:27:21.532056", "photo": "https://dieting.com/storage/35435634.png", "rating_avg": 4.5, "comments": 5, "type": "Low-fat diet", "nutriends": { "protein": 25, "carbohydrates": 40, "fats": 15, "calories": 200 }}'
 *
 */
router.route('/:id').get(show)

/**
 * @openapi
 * /api/recipes:
 *   post:
 *     tags: [
 *        Recipes
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
 *                descriptions: The recipe name
 *              description:
 *                type: string
 *                required: false
 *                descriptions: The recipe steps description
 *              photo:
 *                type: file
 *                required: false
 *                descriptions: The recipe photo
 *              type_id:
 *                type: int
 *                required: true
 *                descriptions: the type related id
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "title": "Honey garlic chicken", "created_at": "2023-26-05 10:27:21.532056", "photo": "https://dieting.com/storage/35435634.png", "type": "Low-fat diet"}'
 *
 */
router
  .route('/')
  .post(
    body('name')
      .isString()
      .isLength({ min: 3 })
      .withMessage('the name must have minimum length of 3')
      .trim(),
    validate,
    store
  )

/**
 * @openapi
 * /api/recipes/:id:
 *   put:
 *     tags: [
 *        Recipes
 *     ]
 *     parameters:
 *       - name: id
 *         in: params
 *         type: integer
 *         description: The id of record to be updated.
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *                descriptions: The recipe name
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *             application/json:
 *                 examples:
 *                     jsonObject:
 *                         summary: An example JSON response
 *                         value: '{ "id": 1, "title": "Honey garlic chicken", "created_at": "2023-26-05 10:27:21.532056", "photo": "https://dieting.com/storage/35435634.png", "type": "Low-fat diet"}'
 *
 */
router
  .route('/:id')
  .put(
    body('name')
      .isString()
      .isLength({ min: 3 })
      .withMessage('the name must have minimum length of 3')
      .trim(),
    validate,
    update
  )

/**
 * @openapi
 * /api/recipes/:id:
 *   delete:
 *     tags: [
 *        Recipes
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
router.route('/:id').delete(destroy)

export default router
