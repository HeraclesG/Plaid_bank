const express = require("express");
const authRoute = require("./auth.route");
const plaidRoute = require("./plaid.route");
const primeTrustRoute = require("./primetrust.route");
const userRoute = require('./user.route');
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/plaid",
    route: plaidRoute,
  },
  {
    path: "/primetrust",
    route: primeTrustRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
