(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const mongoosePaginate = require("mongoose-paginate"),
		uniqueValidator = require("mongoose-unique-validator");
	const CatalogueSchema = new Schema({
		name: {
			type: String
		},
		description: {
			type: String
		},
		category_name: {
			type: String
		},
		cuisine_name: {
			type: String
		},
		price: {
			type: Number
		},
		stock: {
			type: Number,
			default: 100
		}
	}, { timestamps: true, });
	CatalogueSchema.plugin(mongoosePaginate);
	CatalogueSchema.index({ updatedAt: 1 });
	CatalogueSchema.plugin(uniqueValidator, {
		message: "{PATH} must be unique"
	});
	module.exports = model("catalogue", CatalogueSchema);
})();