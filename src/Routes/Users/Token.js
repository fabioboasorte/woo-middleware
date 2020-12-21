import Config from '../../Utils/Config.js'
import { ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'

import express from 'express'
const router = express.Router({ mergeParams: true })

/* GET TOKEN */

router.get("/", async (req, res, next) => {

  const guser = process.env.GUEST_USER;
  const gpass = process.env.GUEST_PASS;

  if (!guser || !gpass) {
    return res.json({ "status": "error", "msg": "Prams Error" })
  }

  await fetch(`${Config[ENV].WOO_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    body: JSON.stringify({
      username: guser,
      password: gpass
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.json(err));
})

export default router;