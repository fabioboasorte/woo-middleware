import Config from './Config.js'
import { PAYMENT_ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'
import xmlParser from 'xml2json';
import querystring from 'querystring';

import express from 'express'
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {

    const request = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: querystring.stringify({
            sessionId: Config[PAYMENT_ENV].SESSIONID,
            amount: 500,
            cardNumber: "4111111111111111",
            cardBrand: "visa",
            cardCvv: "013",
            cardExpirationMonth: "12",
            cardExpirationYear: "2026"
        }),
        redirect: 'follow'
    };

    const url = `${Config[PAYMENT_ENV].CARD_URL}`;

    await fetch(url, request)
        .then(response => response.text())
        .then(result => {
            const resultJson = 
                JSON.parse(xmlParser.toJson(result));

            if (!resultJson.card) {
                res.json({"status":"error", "message": error})
            }

            res.json(resultJson)
        })
        .catch(error => res.json({"status":"error", "message": error}));
})

export default router;