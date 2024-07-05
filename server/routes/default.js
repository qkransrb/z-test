const express = require("express");
const router = express.Router();
const { information } = require("../controllers/default");

router.get("/", information);

module.exports = router;
