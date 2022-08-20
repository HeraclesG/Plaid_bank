const httpStatus = require('http-status');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const util = require('util');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { plaid } = require('../config/config');

const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const PLAID_CLIENT_ID = config.plaid.clientId;
const PLAID_SECRET = config.plaid.secret;
const PLAID_ENV = config.plaid.plaidEnv;

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (config.plaid.product || 'transactions').split(',');

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (config.plaid.countryCode || 'US').split(',');

// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = config.plaid.redirectUri || '';

// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = config.plaid.androidPackageName || '';

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null;
// The transfer_id is only relevant for Transfer ACH product.
// We store the transfer_id in memory - in production, store it in a secure
// persistent data store
let TRANSFER_ID = null;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

const createLinkToken = catchAsync(async (req, res, next) => {
  console.log(req.sessionID)
  Promise.resolve()
    .then(async function () {
      const configs = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: req.sessionID,
        },
        client_name: 'OroCash',
        products: PLAID_PRODUCTS,
        country_codes: PLAID_COUNTRY_CODES,
        language: 'en',
      };

      if (PLAID_REDIRECT_URI !== '') {
        configs.redirect_uri = PLAID_REDIRECT_URI;
      }

      if (PLAID_ANDROID_PACKAGE_NAME !== '') {
        configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
      }
      console.log(configs);
      const createTokenResponse = await client.linkTokenCreate(configs);
      prettyPrintResponse(createTokenResponse);
      res.json(createTokenResponse.data);
    })
    .catch(next);
});

const exchangePublicToken = catchAsync(async(req, res, next)=>{
  console.log(req.sessionID, req.body.public_token)
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });
  console.log(exchangeResponse.data)

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.access_token = exchangeResponse.data.access_token;
  console.log(req.session)
  res.json(true);
})

const setProcessorToken = catchAsync(async (req, res, next) => {
  PUBLIC_TOKEN = req.body.public_token;
  let accountID = req.body.accountID;
  Promise.resolve()
    .then(async function () {
      const tokenResponse = await client.itemPublicTokenExchange({
        public_token: PUBLIC_TOKEN,
      });
      const accessToken = tokenResponse.data.access_token;
      // // Create a processor token for a specific account id.
      const request = {
        access_token: accessToken,
        account_id: accountID,
        processor: 'dwolla',
      };
      const processorTokenResponse = await client.processorTokenCreate(request);
      console.log(processorTokenResponse);
      const processorToken = processorTokenResponse.data.processor_token;

      // const tokenResponse = await client.itemPublicTokenExchange({
      //   public_token: PUBLIC_TOKEN,
      // });
      prettyPrintResponse(tokenResponse);
      ACCESS_TOKEN = tokenResponse.data.access_token;
      ITEM_ID = tokenResponse.data.item_id;
      if (PLAID_PRODUCTS.includes('transfer')) {
        TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
      }
      res.json({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: null,
      });
    })
    .catch(next);
});

const getBalance = catchAsync(async(req, res, next)=>{
  console.log(req.session)
  const access_token = req.session.access_token;
  console.log(access_token)
  const balanceResponse = await client.accountsBalanceGet({ access_token });
  res.json({
    Balance: balanceResponse.data,
  });
}) 

module.exports = {
  createLinkToken,
  setProcessorToken,
  exchangePublicToken,
  getBalance
};
