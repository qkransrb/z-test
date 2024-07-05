const express = require("express");
const { price, zynoPrice } = require("../controllers/price");
const router = express.Router();

// 전체 가격 조회
router.get("/", price);

// ZYNO 가격 조회 (
//    ZYNO-BUSDT 페어 풀의 ( busdt_reserves / zyno_reserves )
// )
router.get("/zyno", zynoPrice);

module.exports = router;
