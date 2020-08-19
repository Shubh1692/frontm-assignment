const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
/**
 * @swagger
 * tags:
 * - name: "orders"
 * components:
 *   schemas:
 *      CatalogueRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            category_name:
 *              type: string
 *            price:
 *              type: number
 *            stock:
 *              type: number
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string 
 *            __v:
 *              type: string
 *      OrderRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/CatalogueRes'
 *            totalAmount:
 *               type: number
 *      BadRequest:
 *       type: object
 *       properties:
 *           status:
 *             type: string
 *           message:
 *            type: string
 *       required:
 *         - status
 *         - message
 *      OrderReq:
 *        type: object
 *        required:
 *         - items
 *        properties:
 *          items:
 *            type: array
 *            items:
 *              type: string
 */ 

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - "orders" 
 *     summary: Returns Order based on search and filters
 *     produces:
 *      - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *            type: string
 *            schema:
 *              $ref: '#/components/schemas/OrderReq'
 *     responses:
 *       200:
 *         description: Get searched food name
 *         schema:
 *           $ref: '#/components/schemas/OrderRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/", OrderController.placeOrders);


module.exports = router;