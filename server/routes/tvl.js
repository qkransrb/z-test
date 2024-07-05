const express = require("express");
const { totalTVL, zynoTVL, zynoBusdtTVL } = require("../controllers/tvl");
const router = express.Router();

// 각 토큰 TVL의 총합 (
//   ZYNO 싱글 풀 TVL + ZYNO-BUSDT 페어 풀 TVL
// )
router.get("/", totalTVL);

// ZYNO TVL 조회 (
//    ZYNO 싱글 풀, ZYNO Reserves 수량 * ZYNO 가격
// )
router.get("/zyno", zynoTVL);

// ZYNO-BUSDT TVL 조회 (
//    ZYNO-BUSDT 페어 풀, ( ZYNO Reserves 수량 * ZYNO 가격 ) + ( BUSDT Reserves 수량 * BUSDT 가격 )
// )
router.get("/zyno_busdt", zynoBusdtTVL);

module.exports = router;
