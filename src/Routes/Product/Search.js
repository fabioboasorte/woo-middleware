import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

const muser = process.env.MAIN_USER;
const mpass = process.env.MAIN_PASS;

/* SEARCH */

/*
http://localhost:8002/products?filter=?search=body
*/

router.post("/", async (req, res, next) => {
  const reqBody = req.body ? req.body : "";

  if (!reqBody) {
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
        let term = reqBody.location.search;
        term = term.replace("?q=", "").replace(/%20/g, " ");

        const url = `${Config[ENV].WOO_URL}/wp-json/wc/v3/products?search=${term}&per_page=100`;

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
            if (success.length > 0) {
              let IDS = [];
              success.map((item) => IDS.push(item.id));
              res.json(IDS);
              return;
            }

            res.json(success);
          })
          .catch((err) => {
            res.json({ status: "error", msg: err });
          });

        return;
      }

      res.json({ status: "error", msg: data.message });
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
