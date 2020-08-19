(function () {
	const debug = require("debug"),
		{ argv } = require("yargs"),
		{ environment = "dev" } = argv,
		serverDebugger = debug("catalogue:server"),
		databaseDebugger = debug("catalogue:database"),
		errorDebugger = debug("catalogue:error");
	if (environment === "dev") {
		debug.enable("catalogue:*");
	}
	module.exports = {
		serverDebugger,
		errorDebugger,
		databaseDebugger
	};
}());