const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /example:
 *  get:
 *      description: Returns a string proving the backend is working.
 *      tags:
 *          - example
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: example
 *              schema:
 *                  type: object
 *                  properties:
 *                      express:
 *                          type: string
 *          500:
 *              description: an error occurred retrieving the customers
 */
router.get('/example', (req, res) => {
    res.send({express: 'IT IS WORKING'})
});

module.exports = router;