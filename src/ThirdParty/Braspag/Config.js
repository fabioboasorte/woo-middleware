import dotenv from "dotenv";
dotenv.config();

const BRASPAG = {
  normal: {
    MERCHANT_ID: process.env.BRASPAG_MERCHANT_ID,
    MERCHANT_KEY: process.env.BRASPAG_MERCHANT_KEY,
    API_URL: "https://api.braspag.com.br",
    API_QUERY: "https://apiquery.braspag.com.br",
    BRASPAG_MID: process.env.BRASPAG_MID,
    BRASPAG_ORGID: process.env.BRASPAG_ORGID,
    VERSION: "v2",
  },
  sandbox: {
    MERCHANT_ID: process.env.BRASPAG_MERCHANT_ID,
    MERCHANT_KEY: process.env.BRASPAG_MERCHANT_KEY_SANDBOX,
    API_URL: "https://apisandbox.braspag.com.br",
    API_QUERY: "https://apiquerysandbox.braspag.com.br",
    BRASPAG_MID: process.env.BRASPAG_MID,
    BRASPAG_ORGID: process.env.BRASPAG_ORGID_SANDBOX,
    VERSION: "v2",
  },
};

export default BRASPAG;
