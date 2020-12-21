import Woo from "../../Utils/Woo.js";
import { WooOrderNotes } from "../../Utils/WooActions.js";

import express from "express";
const router = express.Router({ mergeParams: true });

/* SET NEW ORDER */

router.post("/", async (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody) {
    return res.json({ status: "error" });
  }

  if (!reqBody.data.user.billing.email) {
    reqBody.data.user.billing.email =
      reqBody.data.user.email;
  }

  reqBody.data.user.billing.first_name =
    reqBody.data.user.first_name;
  
  reqBody.data.user.billing.last_name =
    reqBody.data.user.last_name;
  
  reqBody.data.user.shipping.first_name =
    reqBody.data.user.first_name;
  
  reqBody.data.user.shipping.last_name =
    reqBody.data.user.last_name;

  const user = reqBody.data.user;

  const ship = reqBody.data.shipment;

  /* items */

  const items = reqBody.data.cart.items;

  const line_items = [];

  items.map((item) => {
    let newLineItem = {
      product_id: item.id,
      quantity: item.quantity,
    };
    line_items.push(newLineItem);
  });

  /* payment */

  const paymentMethod =
    reqBody.data.payment.type == "credit-card" ? "creditCard" : "boleto";

  const paymentMethodTitle =
    reqBody.data.payment.type == "credit-card" ? "Cartão de Crédito" : "Boleto";

  /* Remove credit-card infos */

  reqBody.data.payment = "";

  /* woo object */

  const data = {
    customer_id: user.id,
    payment_method: paymentMethod,
    payment_method_title: paymentMethodTitle,
    set_paid: true,
    billing: user.billing,
    shipping: user.shipping,
    line_items: line_items,
    shipping_lines: [
      {
        method_id: ship.name,
        method_title: `${ship.name} - ${ship.days}`,
        total: ship.total.toString(),
      },
    ],
    meta_data: [{ key: "_history", value: JSON.stringify(reqBody.data) }],
  };

  Woo.post("orders", data)
    .then((result) => {
      console.log(new Date(), `Set New Order ID ${result.data.id}`);
      return res.json(result.data);
    })
    .catch((err) => {
      console.log(new Date(), err.response.data);
      res.json({ status: "error", msg: err.response.data });
    });
});

export default router;
