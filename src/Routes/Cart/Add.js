import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

/* Add Item From Cart */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody.id || !reqBody.user.token) {
    return res.json({ status: "error" });
  }

  const request = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqBody.user.token}`,
    },
    body: JSON.stringify({
      id: reqBody.id,
      quantity: 1,
      variation: [
        {
          attribute: "Color",
          value: reqBody.colorClicked,
        },
        {
          attribute: "Size",
          value: reqBody.sizeClicked,
        },
      ],
    }),
  };

  // console.log(request);

  await fetch(`${Config[ENV].WOO_URL}/wp-json/wc/store/cart/items`, request)
    .then((response) => response.json())
    .then((data) => {
      console.log(new Date(), `Cart Add ${reqBody.id}`);
      return res.json(data);
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
