import Config from "../../Utils/Config.js";
import Woo3rd from "../../Utils/Woo3rd.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

const muser = process.env.MAIN_USER;
const mpass = process.env.MAIN_PASS;

/* cache control */

import cacheManager from "cache-manager";

const memoryCache =
  cacheManager.caching({
    store: 'memory', max: 10000, ttl: 3600
  });

/* Get Product By Id */

router.get("/", async (req, res, next) => {
  let id = req.params.id;

  if (!id) {
    return res.json({ status: "error", msg: "no-id" });
  }

  memoryCache.get(`product_${id}`, function (cacheErr, cacheRes) {
    
    let cached = cacheRes;
    let cachedErr = cacheErr;

    if (cachedErr) { return res.json({ status: "error", msg: cachedErr }) }

    if (cached) {
      return res.json(cached);
    }

    Woo3rd.getAsync(`products/${id}`)
    .then((result) => {
      var resultObj = JSON.parse(result.toJSON().body);
      memoryCache.set(`product_${id}`, resultObj);
      res.json(resultObj);
    })
    .catch((err) => {
      console.log(new Date(), err);
      res.json({ status: "error" });
    });
  });

});

export default router;
