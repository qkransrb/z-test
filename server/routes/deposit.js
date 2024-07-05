const express = require("express");
const {
  myDeposit,
  myDepositAmount,
  zynoMyDeposit,
  zynoBusdtMyDeposit,
} = require("../controllers/deposit");
const router = express.Router();

// MyDeposit 전체 조회
router.get("/:address", myDeposit);

// ZYNO MyDeposit 조회 (
//     ZYNO 싱글 풀, 지갑 주소의 예치 수량 * ZYNO 가격
// )
router.get("/zyno/:address", zynoMyDeposit);

// ZYNO-BUSDT MyDeposit 조회 (
//     ZYNO-BUSDT 페어 풀, 지갑 주소의 ( ZYNO Reserves 수량 * ZYNO 가격 ) + ( BUSDT Reserves 수량 * BUSDT 가격 )
// )
router.get("/zyno_busdt/:address", zynoBusdtMyDeposit);

router.get("/amount/:address", myDepositAmount);

module.exports = router;
