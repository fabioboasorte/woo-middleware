import Config from './Config.js'
import { PAYMENT_ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'

import express from 'express'
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {

    const request = {
        method: 'GET',
        redirect: 'follow'
    };

    const url = 
        `${Config[PAYMENT_ENV].OLD_API_URL}/checkout/v2/installments.json?sessionId=${Config[PAYMENT_ENV].SESSIONID}&amount=200.00&creditCardBrand=visa`;

    await fetch(url, request)
        .then(response => response.text())
        .then(result => {
            const resultJson = 
                JSON.parse(result);

            if (resultJson.error) {
                res.json(resultJson)
            }

            res.json(resultJson)
        })
        .catch(error => res.json({"status":"error", "message": error}));
})

export default router;