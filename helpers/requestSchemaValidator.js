(function () {
	const { query, body } = require("express-validator");
	const fetchFoodCatalogueSchema = [query("search").optional({ checkFalsy: true }).isString({ min: 1 }),
	query("minPrice").optional({ checkFalsy: true }).isNumeric({ min: 0 }),
	query("maxPrice").optional({ checkFalsy: true }).isNumeric({ min: 0 }),
	query("sortBy").optional({ checkFalsy: true }).isString({ min: 1 }),
	query("sortOrder").optional({ checkFalsy: true }).isNumeric(),
	query("page").optional({ checkFalsy: true }).isNumeric({ min: 1 }),
	query("rowPerPage").optional({ checkFalsy: true }).isNumeric({ min: 1 })
	];

	const placeOrdersSchema = [body("items").isArray({ min: 1 }).isMongoId()
	];
	module.exports = {
		fetchFoodCatalogueSchema,
		placeOrdersSchema
	};
}());