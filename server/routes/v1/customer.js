const express = require('express');
const Customer = require('../../models/customer');
const Mongo = require('../../db/mongo');

const router = express.Router();

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
router.get("/customers", (req, res) => {
    Mongo.GetCustomers().then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while retrieving the customers.`);
    });
});

/**
 * @swagger
 * /customers/{id}:
 *  get:
 *      description: Gets a customer.
 *      tags:
 *          - customers
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: Customer id
 *            in: path
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
 *              description: customer retrieved
 *          500:
 *              description: an error occurred while getting a customer
 */
router.get("/customers/:id", (req, res) => {
    let id = req.params.id;

    Mongo.GetCustomer(id).then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while getting a customer.`);
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
router.post("/customers", (req, res) => {
    let customer = new Customer(req.body.name, req.body.address);
    Mongo.SaveCustomer(customer).then((result) => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while saving a customer.`);
    });
});

/**
 * @swagger
 * /customers/{id}:
 *  put:
 *      description: Updates a customer.
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
 *          - name: id
 *            description: Customer id
 *            in: path
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
 *              description: customer updated
 *          500:
 *              description: an error occurred while updating a customer
 */
router.put("/customers/:id", (req, res) => {
    let id = req.params.id;
    let customer = new Customer(req.body.name, req.body.address);
    customer['_id'] = id;

    Mongo.UpdateCustomer(customer).then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while updating a customer.`);
    });
});

/**
 * @swagger
 * /customers/{id}:
 *  delete:
 *      description: Deletes a customer.
 *      tags:
 *          - customers
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: Customer id
 *            in: path
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
router.delete("/customers/:id", (req, res) => {
    let customerId = req.params.id;
    Mongo.DeleteCustomer(customerId).then(result => {
        res.send(result);
    }, err => {
        res.status(500).send(`An error occurred while deleting a customer.`);
    });
});

module.exports = router;

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
 */