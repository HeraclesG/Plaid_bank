const express = require('express');
const auth = require('../../middlewares/auth');
const primeTrustController = require('../../controllers/primetrust.controller');

const router = express.Router();

router.route('/create_user').post(primeTrustController.createUser);
router.route('/create_jwt').post(primeTrustController.createJwt);

module.exports = router;
