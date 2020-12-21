import dotenv from 'dotenv'
dotenv.config()

const ENV =
  process.env.ENV ?
    process.env.ENV :
    "production"
  ;

const PAYMENT_ENV =
  process.env.PAYMENT_ENV === "sandbox" ?
    "sandbox" : "normal"
  ;

const SHIPMENT_ENV =
  process.env.SHIPMENT_ENV === "sandbox" ?
    "sandbox" : "normal"
  ;

export { ENV, PAYMENT_ENV, SHIPMENT_ENV };
