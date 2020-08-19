(function () {
	const express = require("express"),
		logger = require("morgan"),
		fs = require("fs"),
		indexRouter = require("./routes/index"),
		catalogueRouter = require("./routes/catalogue"),
		orderRouter = require("./routes/order"),
		{ notFoundResponse } = require("./helpers/apiResponse"),
		cors = require("cors"),
		dbConnections = require("./config/database").dbConnections,
		swaggerJSDoc = require("swagger-jsdoc"),
		swaggerOptions = require("./config/swaggerDef"),
		swaggerUi = require("swagger-ui-express"),
		path = require("path"),
		// Express app instance
		app = express();
	const swaggerSpec = swaggerJSDoc(swaggerOptions);
	dbConnections();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	logger(":method :url :status :res[content-length] - :response-time ms");
	app.use(logger("combined", {
		format: "POST body length in bytes :req[Content-Length]",
		skip: (req, res) => { return res.statusCode < 400; },
		stream: fs.createWriteStream(path.join(__dirname, "error.log"), { flags: "a" }),
	}));
	//To allow cross-origin requests
	app.use(cors());
	app.use("/", indexRouter);
	app.use("/catalogues", catalogueRouter);
	app.use("/orders", orderRouter);
	app.get("/api-docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// throw 404 if URL not found
	app.all("*", (req, res) => {
		return notFoundResponse(res, "Page not found");
	});
	module.exports = app;
}());
