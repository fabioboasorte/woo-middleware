import Config from "./Config.js";
// import { SHIPMENT_ENV } from "../../Utils/Env.js";

const API_KEY = Config["normal"].INTELI_KEY;
const API = Config["normal"].API_URL;
const VERSION = Config["normal"].VERSION;

import express from "express";
import fetch from "node-fetch";
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {

  const cep = req.params.id;

  if (!cep) {
    return res.json({ status: "error" });
  }

  const url =
    `${API}/${VERSION}/cep_location/address_complete/${cep}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api_key': API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(new Date(), `New CEP Consult to ${cep}`);
      res.json(data);
    })
    .catch(err => {
      console.log(new Date(), `New CEP Consult with error`);
      res.json(err);
    });
});

export default router;