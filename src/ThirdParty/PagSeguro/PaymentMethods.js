import Config from './Config.js'
import { PAYMENT_ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'

import express from 'express'
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {

    const request = {
        method: 'GET',
        headers: {
            Accept: "application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1"
        },
        redirect: 'follow'
    };

    const url = 
        `${Config[PAYMENT_ENV].API_URL}/payment-methods?
        amount=${500}&
        sessionId=${Config[PAYMENT_ENV].SESSIONID}`
    ;

    await fetch(url, request)
        .then(response => response.text())
        .then(result => res.json(JSON.parse(result)))
        .catch(error => res.json({"status":"error"}));
})

export default router;