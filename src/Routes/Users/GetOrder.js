import Woo from "../../Utils/Woo.js";
import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

const muser = process.env.MAIN_USER;
const mpass = process.env.MAIN_PASS;

/* GET ORDER */

router.post("/", async (req, res, next) => {
  let reqBody = req.body;
  let reqParams = req.params;

  if (!reqBody.token || !reqBody) {
    return res.json({ status: "error" });
  }

  const request = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqBody.token}`,
    },
  };

  await fetch(`${Config[ENV].WOO_URL}/wp-json/wp/v2/users/me`, request)
    .then((response) => response.json())
    .then((user) => {
      /* get id */

      if (!user.id) {
        return res.json({ status: "error", msg: "User not found" });
      }

      /*get order by id */

      if (reqParams.id) {
        return Woo.get(`orders/${reqParams.id}`)
          .then((result) => res.json(result.data))
          .catch((infoErr) => res.json({ status: "error", msg: infoErr }));
      }

      /*get orders by user id */

      console.log(new Date(), `Get Orders from User Id`, user.id);

      fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        body: JSON.stringify({
          username: muser,
          password: mpass,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            request.headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.data.token}`,
            };

            fetch(
              `${Config[ENV].WOO_URL}/wp-json/wc/v2/orders?customer=${user.id}`,
              request
            )
              .then((response) => response.json())
              .then((success) => res.json(success))
              .catch((err) => res.json({ status: "error", msg: err }));

            return;
          }

          res.json({ status: "error", msg: data.message });
        })
        .catch((err) => res.json({ status: "error", msg: err }));
    })
    .catch((infoErr) => res.json({ status: "error", msg: infoErr }));
});

export default router;
