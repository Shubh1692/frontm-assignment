(function () {
	const {
		Schema,
        model,
        O
	} = require("mongoose");
	const mongoosePaginate = require("mongoose-paginate"),
		uniqueValidator = require("mongoose-unique-validator");
	const OrderSchema = new Schema({
		items: [{
			type: Schema.Types.ObjectId,
		}],
		totalAmount: {
            type: Number
        }
	}, { timestamps: true, });
	OrderSchema.plugin(mongoosePaginate);
	OrderSchema.index({ updatedAt: 1 });
	OrderSchema.plugin(uniqueValidator, {
		message: "{PATH} must be unique"
	});
	module.exports = model("Order", OrderSchema);
})();