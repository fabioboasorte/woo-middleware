import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

const muser = process.env.MAIN_USER;
const mpass = process.env.MAIN_PASS;

/* GET PRODUCTS BY QUERY */

router.get("/", async (req, res, next) => {
  if (!req.originalUrl) {
    return res.json({ status: "error" });
  }

  const request = {
    method: "POST",
    body: JSON.stringify({
      username: muser,
      password: mpass,
    }),
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, request)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        let filter = req.url;
        filter = filter.replace("/?filter=", "");

        const url = `${Config[ENV].WOO_URL}/wp-json/wc/v3/products/${filter}`;

        const request2 = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data.token}`,
          },
        };

        fetch(url, request2)
          .then((response) => response.json())
          .then((success) => {
            /* products */
            if (success[0].stock_status) {
              let IDS = [];
              success.map((item) => IDS.push(item.id));
              res.json(IDS);
              return;
            }

            res.json(success);
          })
          .catch((err) => res.json({ status: "error", msg: err }));

        return;
      }

      res.json({ status: "error", msg: data.message });
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
