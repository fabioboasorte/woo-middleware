import Config from "./Config.js";
import { SHIPMENT_ENV } from "../../Utils/Env.js";

const API_KEY = Config[SHIPMENT_ENV].INTELI_KEY;
const API = Config[SHIPMENT_ENV].API_URL;
const VERSION = Config[SHIPMENT_ENV].VERSION;

import express from "express";
import fetch from "node-fetch";
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody.postalCode || !reqBody.cart) {
    return res.json({ status: "error" });
  }

  /* convert woo weight */

  let total_weight = reqBody.cart.total_weight;

  if (!reqBody.cart.desloged) {
    total_weight = total_weight / 1000; //convert to gr
  }

  const request = {
    origin_zip_code: Config[SHIPMENT_ENV].CLIENT_CEP,
    destination_zip_code: reqBody.postalCode,
    volumes: [
      {
        weight: total_weight,
        volume_type: "BOX",
        cost_of_goods: reqBody.cart.total_price,
        width: 10,
        height: 10,
        length: 25,
      },
    ],
    additional_information: {
      free_shipping: false,
      extra_cost_absolute: 0,
      extra_cost_percentage: 0,
      lead_time_business_days: 1,
    },
  };

  const url = `${API}/${VERSION}/quote`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      api_key: API_KEY,
    },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(new Date(), `Quote by Volumes consult`);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      console.log(new Date(), `Quote by Volumes with error`);
      res.json(err);
    });
});

export default router;
