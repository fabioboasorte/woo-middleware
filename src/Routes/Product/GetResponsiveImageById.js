import Config from "../../Utils/Config.js";
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

  memoryCache.get(`product_image_${id}`, function (cacheErr, cacheRes) {
    
    let cached = cacheRes;
    let cachedErr = cacheErr;

    if (cachedErr) { return res.json({ status: "error", msg: cachedErr }) }

    if (cached) {
      return res.json(cached);
    }
     
    /* GET RESPONSIVE IMAGES */

    const requestImage = {
      method: "POST",
      body: JSON.stringify({
        username: muser,
        password: mpass,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, requestImage)
      .then((response) => response.json())
      .then((result) => {
        const requestImage2 = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data.token}`,
          },
        };

        fetch(
          `${Config[ENV].WOO_URL}/wp-json/wp/v2/media/${id}`,
          requestImage2
        )
          .then((response) => response.json())
          .then((data) => {
            memoryCache.set(`product_image_${id}`, data);
            res.json(data);
          })
          .catch((err) => res.json({ status: "error", msg: err }));
      })
      .catch((err) => res.json({ status: "error", msg: err }));
      
  });
});

export default router;
