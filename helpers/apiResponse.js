const util = require("util"),
	{ errorDebugger } = require("../config/debug");
exports.errorResponse = function (res, message) {
	const data = {
		status: 400,
		message,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, message) {
	const data = {
		status: 404,
		message,
	};
	return res.status(404).json(data);
};

exports.validationErrorWithData = function (req, res, message, data) {
	const resData = {
		status: 400,
		message,
		data
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(400).json(resData);
};