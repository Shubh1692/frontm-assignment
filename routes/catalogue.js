const express = require("express");
const router = express.Router();
const CatalogueController = require("../controllers/catalogue.controller");
/**
 * @swagger
 * tags:
 * - name: "catalogues"
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
 */ 

/**
 * @swagger
 * /catalogues:
 *   get:
 *     tags:
 *       - "catalogues" 
 *     summary: Returns Catalogue based on search and filters
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by food name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Search food by minimum price range
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Search food by maximum price range
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         required: false
 *         description: sort by filed
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         required: false
 *         description: sortOrder (1 for Ascending and -1 for Descending )
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: Result by page number
 *       - in: query
 *         name: rowPerPage
 *         schema:
 *           type: number
 *         required: false
 *         description: Results in per page
 *     responses:
 *       200:
 *         description: Get searched food name
 *         schema:
 *           $ref: '#/components/schemas/CatalogueRes'
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
router.get("/", CatalogueController.getCatalogue);


module.exports = router;