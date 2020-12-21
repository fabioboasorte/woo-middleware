import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

/* Remove Item From Cart */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody.key || !reqBody.user.token) {
    return res.json({ status: "error" });
  }

  const request = {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqBody.user.token}`,
    },
  };

  await fetch(
    `${Config[ENV].WOO_URL}/wp-json/wc/store/cart/items/${reqBody.key}`,
    request
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(new Date(), `Cart Remove ${reqBody.key}`);
      return res.json({ status: "success", msg: "Products Removed" });
    })
    .catch((err) => res.json({ status: "error", msg: "Error" }));
});

export default router;
