const express = require('express');
const plaidRoute = require('./plaid.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/plaid',
    route: plaidRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
