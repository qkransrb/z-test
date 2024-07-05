const express = require("express");
const {
  fetchSingleQtbkDepositQuantity,
  fetchSingleQtbkWithdrawQuantity,
  fetchPairQtbkDepositQuantity,
  fetchPairQtbkWithdrawQuantity,
  fetchQtbgClaimRewardsQuantity,
  fetchPairQtbgDepositQuantity,
  fetchPairQtbgWithdrawQuantity,
} = require("../controllers/circulation");
const router = express.Router();

router.get("/singleDposit", fetchSingleQtbkDepositQuantity);
router.get("/singleWithdraw", fetchSingleQtbkWithdrawQuantity);
router.get("/pairDeposit", fetchPairQtbkDepositQuantity);
router.get("/pairWithdraw", fetchPairQtbkWithdrawQuantity);

router.get("/qtbgRewards", fetchQtbgClaimRewardsQuantity);
router.get("/qtbgDeposit", fetchPairQtbgDepositQuantity);
router.get("/qtbgWithdraw", fetchPairQtbgWithdrawQuantity);

module.exports = router;
