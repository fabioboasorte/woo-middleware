import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router();

/* Get Cart */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody.user.token) {
    return res.json({ status: "error" });
  }

  const request = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqBody.user.token}`,
    },
  };

  await fetch(`${Config[ENV].WOO_URL}/wp-json/wc/store/cart`, request)
    .then((response) => response.json())
    .then((data) => {
      console.log(new Date(), `Get Cart`);
      return res.json(data);
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
