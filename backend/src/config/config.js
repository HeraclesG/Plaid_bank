const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

// const process.envSchema = Joi.object()
//   .keys({
//     NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
//     PORT: Joi.number().default(3000),
//     MONGODB_URL: Joi.string().required().description('Mongo DB url'),
//     JWT_SECRET: Joi.string().required().description('JWT secret key'),
//     JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
//     JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
//     JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
//       .default(10)
//       .description('minutes after which reset password token expires'),
//     JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
//       .default(10)
//       .description('minutes after which verify email token expires'),
//     SMTP_HOST: Joi.string().description('server that will send the emails'),
//     SMTP_PORT: Joi.number().description('port to connect to the email server'),
//     SMTP_USERNAME: Joi.string().description('username for email server'),
//     SMTP_PASSWORD: Joi.string().description('password for email server'),
//     EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
//   })
//   .unknown();

// const { value: process.env, error } = process.envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
  wyre: {
    url: `https://api.testwyre.com`,
    referrerAccountId: "AC_MN9RTYNT34T",
    secretKey: "TEST-SK-XE78UJN6-2XP9X3EJ-QDJWYVXE-X364Y2BR",
    apiKey: "TEST-AK-8F37UZU3-EJGN9FE6-4AZ3DN8U-B3Z6H8ND",
  },
  plaid: {
    apihost: "https://sandbox.plaid.com",
    secret: "f6822d0e2c7816641d20127585b233",
    clientId: "62f1f56b97d5700014286c61",
    plaidEnv: "sandbox",
    // product: 'payment_initiation',
    product: "auth,transactions",
    countryCode: "US",
    redirectUri: "",
    androidPackageName: "",
  },
};
