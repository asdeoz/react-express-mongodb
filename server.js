require('dotenv').config();

const Customer = require('./server/models/customer');
const Db = require('./server/db/db');
const Mongo = require('./server/db/mongo');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const specs = require('./server/docs/swaggerOptions.js');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
app.get('/example', (req, res) => {
    res.send({express: 'IT IS WORKING'})
});

app.get('/courses', (req, res) => {
    Db.Get().then(result => {
        res.send(result);
    }, (err) => {
        res.sendStatus(500);
    });
});

/**
 * @swagger
 * /customers:
 *  get:
 *      description: Returns all the customers in the system.
 *      tags:
 *          - customers
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: customers
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Customer'
 *          500:
 *              description: an error occurred retrieving the customers
 */
app.get("/customers", (req, res) => {
    Mongo.GetCustomers().then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while retrieving the customers.`);
    });
});

/**
 * @swagger
 * /customers:
 *  post:
 *      description: Saves a customer.
 *      tags:
 *          - customers
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: customer
 *            description: Customer object
 *            in: body
 *            required: true
 *            type: string
 *            schema:
 *              $ref: '#/definitions/NewCustomer'
 *      responses:
 *          200:
 *              description: customer created
 *          500:
 *              description: an error occurred while saving the customer
 */
app.post("/customers", (req, res) => {
    let customer = new Customer(req.body.name, req.body.address);
    Mongo.SaveCustomer(customer).then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while saving a customer.`);
    });
});

/**
 * @swagger
 * /customers:
 *  delete:
 *      description: Deletes a customer.
 *      tags:
 *          - customers
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: customer id
 *            description: Customer id
 *            in: body
 *            required: true
 *            type: string
 *            schema:
 *              type: string
 *              required:
 *                - id
 *              properties:
 *                id:
 *                  type: string
 *      responses:
 *          200:
 *              description: customer deleted
 *          500:
 *              description: an error occurred while deleting the customer
 */
app.delete("/customers", (req, res) => {
    let customerId = req.body.id;
    Mongo.DeleteCustomer(customerId).then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while deleting a customer.`);
    });
});

app.listen(port, () => `Listening on port ${port}`);

/**
 * @swagger
 * definitions:
 *  NewCustomer:
 *      type: object
 *      required:
 *          - name
 *          - address
 *      properties:
 *          name:
 *              type: string
 *          address:
 *              type: string
 *  Customer:
 *      allOf:
 *          - $ref: '#/definitions/NewCustomer'
 *          - properties:
 *              _id:
 *                  type: string
 * tags:
 *  - name: customers
 *    description: CRUD for customers
 *  - name: example
 *    description: example calls to the API
 */