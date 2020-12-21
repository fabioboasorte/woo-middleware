import Config from "./Config.js";
import { ENV } from "./Env.js";
import dotenv from "dotenv";
dotenv.config();

/* Original Api */

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi.default({
  url: Config[ENV].WOO_URL,
  wpAPI: true,
  version: "wc/v3",
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
});

export default WooCommerce;
