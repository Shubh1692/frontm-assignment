(function () {
	const Catalogue = require("../models/catalogue"),
		Order = require("../models/order"),
		{ validationErrorWithData, errorResponse } = require("../helpers/apiResponse"),
		{ validationResult } = require("express-validator"),
		{ placeOrdersSchema } = require("../helpers/requestSchemaValidator");
	const placeOrders = [...placeOrdersSchema, async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return validationErrorWithData(req, res, "Validation Error.", errors.array());
			}
			const {
				items
			} = req.body;
			const catalogues = await Catalogue.find({
				_id: {
					$in: items
				}
			}, {
				stock: 1, price: 1
			});
			let totalAmount = 0;
			const isAllItemInStocks = catalogues.every(({
				stock,
				price
			}) => {
				totalAmount = totalAmount + price;
				return stock > 0;
			});
			if (!isAllItemInStocks) {
				return errorResponse(res, "Your order is out of stock");
			}
			const order = new Order({
				items,
				totalAmount
			});
			await order.save();
			for (let i = 0; i < catalogues.length; i++) {
				catalogues[i].stock = catalogues[i].stock -1;
				await catalogues[i].save();
			}
			res.status(200).send({
				order
			});
		} catch (error) {
			console.log("error", error)
			validationErrorWithData(req, res, "Data is missing", error);
		}
	}];


	module.exports = {
		placeOrders
	};
})();