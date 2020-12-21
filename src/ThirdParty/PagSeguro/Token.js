import Config from './Config.js'
import { PAYMENT_ENV } from '../../Utils/Env.js'
import fetch from 'node-fetch'
import xmlParser from 'xml2json';

import express from 'express'
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {

    const request = {
        method: 'POST',
        redirect: 'follow'
    };

    const url = 
        `${Config[PAYMENT_ENV].API_URL}/v2/sessions?email=${Config[PAYMENT_ENV].EMAIL}&token=${Config[PAYMENT_ENV].TOKEN}`
    ;

    await fetch(url, request)
        .then(response => response.text())
        .then(result => {
            const resultJson = 
                JSON.parse(xmlParser.toJson(result));

            if (!resultJson.session.id) {
                res.json({"status":"error", "message": error})
            }

            res.json(resultJson);
        })
        .catch(error => res.json({"status":"error", "message": error}));
})

export default router;