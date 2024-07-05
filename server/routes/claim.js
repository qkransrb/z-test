const express = require("express");
const {
  claimable,
  zynoClaimable,
  zynoBusdtClaimable,
} = require("../controllers/claim");
const router = express.Router();

// Claimable Rewards 전체 조회
router.get("/:address", claimable);

// ZYNO Claimable Rewards 조회
router.get("/zyno/:address", zynoClaimable);

// ZYNO-BUSDT Claimable Rewards 조회
router.get("/zyno_busdt/:address", zynoBusdtClaimable);

module.exports = router;
