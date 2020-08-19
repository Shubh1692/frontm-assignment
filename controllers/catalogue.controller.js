(function () {
	const Catalogue = require("../models/catalogue"),
		{ validationErrorWithData } = require("../helpers/apiResponse"),
		{ validationResult } = require("express-validator"),
		{ fetchFoodCatalogueSchema } = require("../helpers/requestSchemaValidator");
	const getCatalogue = [...fetchFoodCatalogueSchema, async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return validationErrorWithData(req, res, "Validation Error.", errors.array());
			}
			const {
				search = '',
				maxPrice = Infinity,
				minPrice = 0,
				sortBy = 'name',
				sortOrder = 1,
				page = 1,
				rowPerPage = 10
			} = req.query;
			const regex = new RegExp(search, 'i');
			const catalogues = await Catalogue.paginate({
				$and: [
					{
						$or: [
							{
								name: {
									$regex: regex
								}
							},
							{
								description: {
									$regex: regex
								}
							},
							{
								category_name: {
									$regex: regex
								}
							},
							{
								cuisine_name: {
									$regex: regex
								}
							}
						]
					},
					{
						price: { $lte: maxPrice, $gte: minPrice }
					}
				]
			}, {
				page: Number(page),
				limit: Number(rowPerPage),
				sort: {
					[sortBy]: sortOrder
				}
			});
			res.status(200).send({
				catalogues
			});
		} catch (error) {
			console.log("error", error)
			validationErrorWithData(req, res, "Data is missing", error);
		}
	}];


	module.exports = {
		getCatalogue
	};
})();