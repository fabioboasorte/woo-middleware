import Config from "./Config.js";
import { PAYMENT_ENV } from "../../Utils/Env.js";
import fetch from "node-fetch";
import xmlParser from "xml2json";
import querystring from "querystring";

import express from "express";
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody) {
    return res.json({ status: "error" });
  }

  if (!reqBody.data.senderHash) {
    return res.json({ status: "error" });
  }

  const requestSession = {
    method: "POST",
    redirect: "follow",
  };

  const urlSession = `${Config[PAYMENT_ENV].API_URL}/v2/sessions?email=${Config[PAYMENT_ENV].EMAIL}&token=${Config[PAYMENT_ENV].TOKEN}`;
  await fetch(urlSession, requestSession)
    .then((response) => response.text())
    .then((session) => {
      const sessionJson = JSON.parse(xmlParser.toJson(session));

      if (!sessionJson.session.id) {
        res.json({ status: "error", message: error });
      }

      const cart = reqBody.data.cart;
      const user = reqBody.data.user;
      const payment = reqBody.data.payment;

      let phone = user.billing.phone ? user.billing.phone : user.shipping.phone;

      phone = phone.match(/(\([0-9]*\))|([0-9]*\-?[0-9]*)/g);

      let phoneCode = phone[0];
      phoneCode = phoneCode.replace("(", "").replace(")", "");

      phone = phone[2].replace("-", "");

      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
          sessionId: sessionJson.session.id,
          paymentMode: "default",
          paymentMethod: "creditCard",
          receiverEmail: Config[PAYMENT_ENV].EMAIL,
          currency: "BRL",

          creditCardToken: payment.token,
          installmentQuantity: 1,
          installmentValue: parseFloat(cart.total_price).toFixed(2),
          noInterestInstallmentQuantity: 2,
          creditCardHolderName: "Jose Comprador",
          creditCardHolderCPF: "22111944785",
          creditCardHolderBirthDate: "27/10/1987",
          creditCardHolderAreaCode: "11",
          creditCardHolderPhone: "56273440",
          billingAddressStreet: "Av. Brig. Faria Lima",
          billingAddressNumber: "1384",
          billingAddressComplement: "5o andar",
          billingAddressDistrict: "Jardim Paulistano",
          billingAddressPostalCode: "01452002",
          billingAddressCity: "Sao Paulo",
          billingAddressState: "SP",
          billingAddressCountry: "BRA",

          extraAmount: "0.00",

          itemId1: "0001",
          itemDescription1: "Blusa Rosa",
          itemAmount1: parseFloat(cart.total_price).toFixed(2),
          itemQuantity1: "1",

          notificationURL: "http://18.230.179.62:8002/return-payment",
          reference: "REF1234",

          senderName: `${user.first_name} ${user.last_name}`,
          senderCPF: user.shipping.cpf ? user.shipping.cpf : "22111944785",
          senderAreaCode: phoneCode ? phoneCode : "11",
          senderPhone: phone ? phone : "32220000",
          senderEmail: Config[PAYMENT_ENV].EMAIL_SANDBOX
            ? Config[PAYMENT_ENV].EMAIL_SANDBOX
            : user.email,
          senderHash: reqBody.data.senderHash,

          shippingAddressStreet: `${user.shipping.address_1}`,
          shippingAddressNumber: user.shipping.number
            ? user.shipping.number
            : "000",
          shippingAddressComplement: user.shipping.address_2,
          shippingAddressDistrict: user.shipping.district
            ? user.shipping.district
            : "District",
          shippingAddressPostalCode: user.shipping.postcode,
          shippingAddressCity: user.shipping.city,
          shippingAddressState: user.shipping.state,
          shippingAddressCountry: "BRA",
          shippingType: "1",
          shippingCost: "0.00",
        }),
        redirect: "follow",
      };

      console.log(new Date(), request);

      // res.json({"status": "error", "message": "Service Out"});
      // return;

      const url = `${Config[PAYMENT_ENV].API_URL}/v2/transactions?email=${Config[PAYMENT_ENV].EMAIL}&token=${Config[PAYMENT_ENV].TOKEN}`;

      fetch(url, request)
        .then((response) => response.text())
        .then((result) => {
          const resultJson = JSON.parse(xmlParser.toJson(result));

          console.log(new Date(), JSON.stringify(resultJson));

          res.json(resultJson);
        })
        .catch((error) =>
          res.json({ status: "error", message: "Service Out" })
        );
    })
    .catch((error) => res.json({ status: "error", message: error }));
});

export default router;
