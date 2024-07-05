const express = require("express");
const {
  reserves,
  pairReserves,
  zynoReserves,
  zynoBusdtReserves,
} = require("../controllers/reserve");
const router = express.Router();

// ZYNO, BUSDT 각 토큰의 Reserves
router.get("/", reserves);

router.get("/original", pairReserves);

// ZYNO 싱글 Reserves 조회
router.get("/zyno", zynoReserves);

// ZYNO-BUSDT 페어 Reserves 조회
router.get("/zyno_busdt", zynoBusdtReserves);

module.exports = router;
