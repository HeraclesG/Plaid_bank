const express = require('express');
const auth = require('../../middlewares/auth');
const plaidController = require('../../controllers/plaid.controller');

const router = express.Router();

router.route('/create_link_token').get(plaidController.createLinkToken);
router.route('/exchange_public_token').post(plaidController.exchangePublicToken);
router.route('/set_processor_token').post(plaidController.setProcessorToken);
router.route('/balance').get(plaidController.getBalance);

module.exports = router;
