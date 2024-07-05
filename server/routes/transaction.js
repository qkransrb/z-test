const express = require("express");
const {
  saveSingleDepositTransaction,
  saveSingleWithdrawTransaction,
  saveClaimRewardsTransaction,
  savePairDepositApproveTransaction,
  savePairDepositTransaction,
  savePairWithdrawApproveTransaction,
  savePairWithdrawTransaction,
} = require("../controllers/transaction");

const router = express.Router();

router.post("/single/deposit", saveSingleDepositTransaction);
router.post("/single/withdraw", saveSingleWithdrawTransaction);
router.post("/claim", saveClaimRewardsTransaction);
router.post("/pair/deposit/approve", savePairDepositApproveTransaction);
router.post("/pair/deposit", savePairDepositTransaction);
router.post("/pair/withdraw/approve", savePairWithdrawApproveTransaction);
router.post("/pair/withdraw", savePairWithdrawTransaction);

module.exports = router;
