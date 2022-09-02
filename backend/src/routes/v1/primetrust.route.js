const express = require("express");
const auth = require("../../middlewares/auth");
const primeTrustController = require("../../controllers/primetrust.controller");

const router = express.Router();

router.route("/create_user").post(primeTrustController.createUser);
router.route("/create_jwt").post(primeTrustController.createJwt);
router.route("/get_accounts").get(primeTrustController.getAccounts);
router.route("/create_individual_account").post(primeTrustController.createIndividualAccount);
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

module.exports = router;
