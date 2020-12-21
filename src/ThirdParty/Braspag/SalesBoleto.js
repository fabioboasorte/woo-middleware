import Config from "./Config.js";
import { PAYMENT_ENV } from "../../Utils/Env.js";

/* Third Party:
https://github.com/ricardoabdalla/BraspagNodeJsSdk */

import PagadorClient from "./Core/PagadorClient.js";
/* ------------------------------------------------------- */

import {
  WooOrderSetFailed,
  WooOrderNotes,
  WooOrderSetOnHolding,
  WooOrderSetPayHistory,
} from "../../Utils/WooActions.js";

const MerchantId = Config[PAYMENT_ENV].MERCHANT_ID;
const MerchantKey = Config[PAYMENT_ENV].MERCHANT_KEY;

const pagadorClient = new PagadorClient({
  env: "production",
  credentials: {
    MerchantId: MerchantId,
    MerchantKey: MerchantKey,
  },
});

import express from "express";
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody) {
    return res.json({ status: "error" });
  }

  const data = reqBody.data;

  var userCpf = "";

  var billingNumber = "";

  data.user.meta_data.map((meta) => {
    if (meta.key == "_cpf") {
      userCpf = meta.value;
    }

    if (meta.key == "_billing_number") {
      billingNumber = meta.value;
    }
  });

  if (!userCpf) {
    return res.json({ status: "error", msg: "CPF not found!" });
  }

  if (
    data.cart.coupon_price == "" ||
    data.cart.coupon_price == undefined ||
    data.cart.coupon_price == null
  ) {
    data.cart.coupon_price = "0.00";
  }

  let total =
    data.cart.coupon_price == "0.00"
      ? data.cart.boleto_price
      : data.cart.coupon_price;

  total = total.toString().replace(/\./g, "");

  /* manipulate dates */

  var todayYear = new Date().getFullYear().toString().slice(-2);
  var todayMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
  var todayDay = ("0" + new Date().getDate()).slice(-2);

  const boletoNumber = `${todayYear}${todayMonth}${todayDay}${data.orderWooId}`;

  const orderNumber = `${todayYear}${todayMonth}${data.orderWooId}`;

  let expirationDate = new Date();

  expirationDate = expirationDate.setDate(expirationDate.getDate() + 3);

  var expYear = new Date(expirationDate).getFullYear();
  var expMonth = ("0" + (new Date(expirationDate).getMonth() + 1)).slice(-2);
  var expDay = ("0" + new Date(expirationDate).getDate()).slice(-2);

  expirationDate = `${expYear}-${expMonth}-${expDay}`;

  /* build request */

  var sidNumber = data.user.sid.replace("", "");

  var request = {
    MerchantOrderId: orderNumber,
    Customer: {
      Name: `${data.user.first_name} ${data.user.last_name}`,
      Identity: userCpf, //todo
      IdentityType: "CPF",
      Address: {
        Street: data.user.billing.address_1,
        Number: billingNumber,
        Complement: data.user.billing.address_2,
        ZipCode: data.user.billing.postcode,
        City: data.user.billing.city,
        State: data.user.billing.state,
        Country: "BRA",
        District: data.user.billing.company,
      },
    },
    Payment: {
      Provider: "Bradesco2",
      Type: "Boleto",
      Amount: total,
      BoletoNumber: boletoNumber,
      Assignor: "Ecommerce",
      Demonstrative: `Pedido Loja Ecommerce #${data.orderWooId}`,
      ExpirationDate: expirationDate,
      // Identification: "",
      Instructions: "Aceitar somente até a data de vencimento.",

      /* bradesco */
      // DaysToFine: 3, //Quantidade de dias após o vencimento para cobrar o valor da multa
      // FineRate: 10.0, //Valor da multa após o vencimento em percentual
      // FineAmount: 1000, //Valor da multa após o vencimento em valor
      // DaysToInterest: 3, //Quantidade de dias após o vencimento para iniciar a cobrança de juros
      // InterestRate: 5.0, //Valor de juros mensal após o vencimento em percentual
      // InterestAmount: 500, //Valor absoluto de juros diário após o vencimento
    },
  };

  // WooOrderNotes(data.orderWooId, JSON.stringify(request));

  var response = await pagadorClient.createSale(request);

  // console.log(response);

  console.log(new Date(), "[BRASPAG-REQUEST]", JSON.stringify(request));

  /* APPROVED */

  if (response.httpStatus == 201) {
    console.log(
      new Date(),
      `Order Approved by boleto ${request.MerchantOrderId}`
    );

    WooOrderSetOnHolding(data.orderWooId);
    WooOrderSetPayHistory(data.orderWooId, JSON.stringify(response));

    res.json(response);

    return;
  }

  /* REFUSED */

  console.log(new Date(), "[BRASPAG-RESPONSE]", JSON.stringify(response.data));

  WooOrderSetFailed(data.orderWooId);
  WooOrderSetPayHistory(data.orderWooId, JSON.stringify(response.data));

  console.log(new Date(), `Order Failed by boleto ${request.MerchantOrderId}`);

  res.json(response.data);
});

export default router;
