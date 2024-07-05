const express = require("express");
const { getMyBalance } = require("../controllers/balance");
const router = express.Router();

router.get("/:address", getMyBalance);

module.exports = router;
