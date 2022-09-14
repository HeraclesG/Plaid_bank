const express = require("express");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: "./uploads/",
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
const authValidation = require("../../validations/primetrust.validation");
const primeTrustController = require("../../controllers/primetrust.controller");

const router = express.Router();

router.route("/create_user").post(primeTrustController.createUser);
router.route("/create_jwt").post(primeTrustController.createJwt);
router.route("/get_accounts").get(primeTrustController.getAccounts);
router.post(
  "/set_account",
  checkHeader,
  validate(authValidation.setAccount),
  primeTrustController.setAccount
);
router
  .route("/create_individual_account")
  .post(primeTrustController.createIndividualAccount);
router
  .route("/upload_documents")
  .post(upload.single("kycdoc"), primeTrustController.uploadDocuments);
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
