const express = require("express");
const { getLiquidities } = require("../controllers/liquidity");
const router = express.Router();

router.get("/:pairA/:pairB/:address", getLiquidities);

module.exports = router;
