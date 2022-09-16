const express = require("express");
const multer = require("multer");
var storage = multer.diskStorage({
  // destination: "./uploads/",
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const fs = require("fs");
const validate = require("../../middlewares/validate");
const checkHeader = require("../../middlewares/checkHeader");
const auth = require("../../middlewares/auth");
const primeTrustValidation = require("../../validations/primetrust.validation");
const primeTrustController = require("../../controllers/primetrust.controller");

const router = express.Router();

router.route("/create_user").post(primeTrustController.createUser);
router.route("/create_jwt").post(primeTrustController.createJwt);
router.route("/get_accounts").get(primeTrustController.getAccounts);
router.post(
  "/set_account",
  checkHeader,
  validate(primeTrustValidation.setAccount),
  primeTrustController.setAccount
);
router
  .route("/create_individual_account")
  .post(primeTrustController.createIndividualAccount);
router
  .route("/account_aggregate_policies")
  .get(primeTrustController.accountPolicy);
router
  .route("/agreement_previews")
  .post(primeTrustController.agreementPreviews);
router.route("/get_resource_token").get(primeTrustController.getResourceTokens);
router
  .route("/create_resource_token")
  .post(primeTrustController.createResourceTokens);

//real api
router.post(
  "/upload_documents",
  upload.single("kycdoc"),
  validate(primeTrustValidation.uploadDocuments),
  primeTrustController.uploadDocuments
);

router.post(
  "/deposit_fund",
  auth(),
  validate(primeTrustValidation.depositFund),
  primeTrustController.depositFund
);

router.post(
  "/get_fund_balance",
  auth(),
  // validate(primeTrustValidation.uploadDocuments),
  primeTrustController.getFundBalance
);

router.post(
  "/transfer_fund",
  auth(),
  validate(primeTrustValidation.transferFund),
  primeTrustController.transferFund
);

router.post("/fake_fund", primeTrustController.fakeFund);

router.post("/deposit_asset", auth(), primeTrustController.depositAsset);

router.post("/get_asset_balance", auth(), primeTrustController.getAssetBalance);

router.post(
  "/transfer_asset",
  auth(),
  validate(primeTrustValidation.transferFund),
  primeTrustController.transferAsset
);

router.post(
  "/fund_simple_transaction_history",
  auth(),
  primeTrustController.fundSimpleTransactionHistory
);

router.post(
  "/fund_transaction_history",
  auth(),
  primeTrustController.fundTransactionHistory
);

router.post(
  "/asset_transaction_history",
  auth(),
  primeTrustController.assetTransactionHistory
);

router.post(
  "/withdraw_fund",
  auth(),
  validate(primeTrustValidation.depositFund),
  primeTrustController.withdrawFund
);

router.post(
  "/withdraw_asset",
  auth(),
  validate(primeTrustValidation.withdrawAsset),
  primeTrustController.withdrawAsset
);

module.exports = router;
