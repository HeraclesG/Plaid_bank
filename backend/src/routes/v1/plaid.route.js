const express = require('express');
const auth = require('../../middlewares/auth');
const plaidController = require('../../controllers/plaid.controller');

const router = express.Router();

router.route('/create_link_token').post(plaidController.createLinkToken);
router.route('/set_processor_token').post(plaidController.setProcessorToken);

module.exports = router;
