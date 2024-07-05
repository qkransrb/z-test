const express = require("express");
const { APR, zynoAPR, zynoBusdtAPR } = require("../controllers/apr");
const router = express.Router();

// 전체 APR 조회
router.get("/", APR);

// ZYNO APR 조회 (
//     ( ( ZYNO 단일 풀 Daily Rewards 수량 * 365 * ZYNO 가격 ) / ( ZYNO 단일 풀 Reserves 수량 * ZYNO 가격 ) ) * 100
// )
router.get("/zyno", zynoAPR);

// ZYNO-BUSDT APR 조회 (
//     ( ( ZYNO-BUSDT 페어 풀 Daily Rewards 수량 * 365 * ZYNO 가격 ) / ( ZYNO-BUSDT 페어 풀의 ZYNO Reserves 수량 * ZYNO 가격 + ZYNO-BUSDT 페어 풀의 BUSDT 수량 * 1 ) ) * 100
// )
router.get("/zyno_busdt", zynoBusdtAPR);

module.exports = router;
