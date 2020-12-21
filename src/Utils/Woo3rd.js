import Config from "./Config.js";
import { ENV } from "./Env.js";
import dotenv from "dotenv";
dotenv.config();

/* Third Api */
/*
https://www.npmjs.com/package/woocommerce-api
*/

import WooCommerceAPI from "woocommerce-api";

const WooCommerce3rd = new WooCommerceAPI({
  url: Config[ENV].WOO_URL,
  wpAPI: true,
  version: "wc/v1",
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
});

export default WooCommerce3rd;
