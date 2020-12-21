import Woo from '../../Utils/Woo.js'
import Config from '../../Utils/Config.js'
import { ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'

import express from 'express'
const router = express.Router({ mergeParams: true })

/* GET FAVORITE */

router.post("/", async (req, res, next) => {

  let reqBody = req.body;

  if (!reqBody) {
    return res.json({ "status": "error", "msg": "Params Error" });
  }

  const request = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${reqBody.token}`
    }
  }

  await fetch(`${Config[ENV].WOO_URL}/wp-json/wp/v2/users/me`, request)
    .then(response => response.json())
    .then(user => {

      /* get id */
      if (!user.id) {
        return res.json({ "status": "error", "msg": "User not found" })
      }

      /*get info */
      Woo.get(`customers/${user.id}`)
        .then(result => {

          const favorite = {
            products: ""
          }

          if (typeof result.data.meta_data === "object") {
            result.data.meta_data.map(item => {
              if (item.key === '_favorites') {
                favorite.products = item.value.split(',');
                favorite.count = item.value.split(',').length;
              }
            })
          }

          return res.json(favorite)
        })
        .catch(infoErr => res.json({ "status": "error", "msg": infoErr }))

    })

})

export default router;