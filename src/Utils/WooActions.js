import Woo from "./Woo.js";

/*
 https://docs.woocommerce.com/document/managing-orders/
*/

/* SET ORDER FAILED */

export const WooOrderSetFailed = (order) => {
  const data = { status: "cancelled" };
  return Woo.post(`orders/${order}`, data)
    .then(() =>
      console.log(new Date(), `Set status CANCELLED to Order ID: ${order}`)
    )
    .catch((err) => console.log(new Date(), err.response.data));
};

/* SET ORDER NOTES */

export const WooOrderNotes = (order, note, customer_note = false) => {
  const data = { note, customer_note };
  return Woo.post(`orders/${order}/notes`, data)
    .then(() => console.log(new Date(), `Set NOTE to Order ID: ${order}`))
    .catch((err) => console.log(new Date(), err.response.data));
};

/* SET ORDER APPROVED */

export const WooOrderSetApproved = (order) => {
  const data = { status: "processing" };
  return Woo.post(`orders/${order}`, data)
    .then(() =>
      console.log(new Date(), `Set status PROCESSING to Order ID: ${order}`)
    )
    .catch((err) => console.log(new Date(), err.response.data));
};

/* SET ORDER PAYMENT PENDING */

export const WooOrderSetOnHolding = (order) => {
  const data = { status: "on-hold" };
  return Woo.post(`orders/${order}`, data)
    .then(() =>
      console.log(
        new Date(),
        `Set status PAYMENT ON HOLD to Order ID: ${order}`
      )
    )
    .catch((err) => console.log(new Date(), err.response.data));
};

/* SET ORDER PAYMENT HISTORY */

export const WooOrderSetPayHistory = (order, note) => {
  const data = {
    meta_data: [{ key: "_pay_history", value: note }],
  };

  return Woo.post(`orders/${order}`, data)
    .then(() =>
      console.log(new Date(), `Set history payment to Order ID: ${order}`)
    )
    .catch((err) => console.log(new Date(), err.response.data));
};

/* SET ORDER SHIPMENT HISTORY */

export const WooOrderSetShipHistory = (order, note) => {
  const data = {
    meta_data: [{ key: "_shipment_history", value: note }],
  };

  return Woo.post(`orders/${order}`, data)
    .then(() =>
      console.log(new Date(), `Set history shipment to Order ID: ${order}`)
    )
    .catch((err) => console.log(new Date(), err.response.data));
};
