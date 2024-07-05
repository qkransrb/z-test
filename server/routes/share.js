const express = require("express");
const {
  shareOfMyPool,
  shareOfMyPoolZyno,
  shareOfMyPoolZynoBusdt,
} = require("../controllers/share");

const router = express.Router();

// Share Of My Pool 전체 조회
router.get("/:address", shareOfMyPool);

// ZYNO Share Of My Pool 조회 (
//     ZYNO 싱글 풀, ( 지갑 주소의 예치 수량 / 전체 예치 수량 )
// )
router.get("/zyno/:address", shareOfMyPoolZyno);

// ZYNO-BUSDT Share Of My Pool 조회
//     ZYNO-BUSDT 페어 풀, ( 지갑 주소의 예치 수량 / 전체 예치 수량 )
// )
router.get("/zyno_busdt/:address", shareOfMyPoolZynoBusdt);

module.exports = router;
