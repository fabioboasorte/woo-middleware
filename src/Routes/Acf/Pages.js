import Woo from "../../Utils/Woo.js";
import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

const muser = process.env.MAIN_USER;
const mpass = process.env.MAIN_PASS;

/*  OPTIONS PAGE */

router.get("/", async (req, res, next) => {

  let id = req.params.id;

  const request = {
    method: "POST",
    body: JSON.stringify({
      username: muser,
      password: mpass,
    }),
    headers: { "Content-Type": "application/json" },
  };

  fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, request)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {

        const request2 = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data.token}`,
          }
        };

        fetch(
          `${Config[ENV].WOO_URL}/wp-json/acf/v3/pages/${id}`, request2)
          .then((response) => response.json())
          .then((success) => res.json(success))
          .catch((err) => res.json({ status: "error", msg: err }));

        return;
      }

      res.json({ status: "error", msg: data.message });
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
