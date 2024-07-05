const express = require("express");
const { getEstimatedBalance } = require("../controllers/swap");
const router = express.Router();

router.post("/estimated", getEstimatedBalance);

module.exports = router;
