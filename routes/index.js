const express = require("express");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
	res.render("index", { title: "Express" });
});

router.get("/error.log", (req, res) => {
	res.sendFile(path.join(__dirname, "../error.log"));
});

module.exports = router;