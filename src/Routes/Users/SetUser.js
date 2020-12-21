import Woo from "../../Utils/Woo.js";
import Config from "../../Utils/Config.js";
import { ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";

import express from "express";
const router = express.Router({ mergeParams: true });

/* SET USER */

router.post("/", async (req, res, next) => {
  let reqBody = req.body;

  if (!reqBody || !reqBody.data) {
    return res.json({ status: "error", msg: "Params Error" });
  }

  const request = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqBody.auth.token}`,
    },
  };

  await fetch(`${Config[ENV].WOO_URL}/wp-json/wp/v2/users/me`, request)
    .then((response) => response.json())
    .then((user) => {
      /* get id */
      console.log(new Date(), `Get User Id`, user.id);

      if (!user.id) {
        return res.json({ status: "error", msg: "User not found" });
      }

      Woo.put(`customers/${user.id}`, reqBody.data)
        .then((result) => {
          console.log(new Date(), `Set User Data`, user.id);
          return res.json(result.data);
        })
        .catch((infoErr) => res.json({ status: "error", msg: infoErr }));
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

export default router;
