import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

/* Store Info */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  console.log(new Date());

  if (!reqBody.email || !reqBody.pass) {
    return res.json({ status: "error", msg: "Prams Error" });
  }

  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: reqBody.email,
      password: reqBody.pass,
    }),
  };

  await fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, request)
    .then((response) => response.json())
    .then((result) => {
      console.log(new Date(), `Login user ${reqBody.email}`);
      return res.json(result);
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
