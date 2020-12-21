import { ENV } from "./Utils/Env.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

/* Express Configs */
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* 
-----------------------------------------------------------------------
LIST OF END POINTS 
*/
/* Shipping End Points */
import ConsultaCep from "./ThirdParty/Intelipost/ConsultaCep.js";
import ShipInfo from "./ThirdParty/Intelipost/Info.js";
import QuoteProduct from "./ThirdParty/Intelipost/QuoteProduct.js";
import QuoteVolumes from "./ThirdParty/Intelipost/QuoteVolumes.js";
import QuoteConsult from "./ThirdParty/Intelipost/QuoteConsult.js";
import ShipmentOrder from "./ThirdParty/Intelipost/ShipmentOrder.js";

app.use("/consulta-cep/:id", ConsultaCep);
app.use("/itp/info", ShipInfo);
app.use("/itp/quote-product", QuoteProduct);
app.use("/itp/quote-volumes", QuoteVolumes);
app.use("/itp/quote-consult/:id", QuoteConsult);
app.use("/itp/shipment-order/:id", ShipmentOrder);

/* BRASPAG End Points */
import Sales from "./ThirdParty/Braspag/Sales.js";
import SalesBoleto from "./ThirdParty/Braspag/SalesBoleto.js";
import Analysis from "./ThirdParty/Braspag/Analysis.js";
import Notification from "./ThirdParty/Braspag/Notification.js";

app.use("/bpg/payment/credit-card", Sales);
app.use("/bpg/payment/boleto", SalesBoleto);
app.use("/bpg/analysis", Analysis);
app.use("/bpg/notification", Notification);

/* ACF */
import OptionsPage from "./Routes/Acf/OptionsPage.js";
import Posts from "./Routes/Acf/Posts.js";
import Pages from "./Routes/Acf/Pages.js";
import Newsletter from "./Routes/Acf/Newsletter.js";

app.use("/acf/options-page", OptionsPage);
app.use("/acf/posts", Posts);
app.use("/acf/pages/:id", Pages);
app.use("/acf/newsletter", Newsletter);

/* CHECKOUT End Points */
import Rules from "./Routes/Checkout/Rules.js";
import WooOrder from "./Routes/Checkout/WooOrder.js";
import Coupons from "./Routes/Checkout/Coupons.js";

app.use("/checkout-rules", Rules);
app.use("/order/new", WooOrder);
app.use("/coupons", Coupons);

/* USERS End Points */
import GetUser from "./Routes/Users/GetUser.js";
import SetUser from "./Routes/Users/SetUser.js";
import Login from "./Routes/Users/Login.js";
import Register from "./Routes/Users/Register.js";
import ConfirmAccount from "./Routes/Users/ConfirmAccount.js";
import Token from "./Routes/Users/Token.js";
import Favorite from "./Routes/Users/Favorite.js";
import GetOrder from "./Routes/Users/GetOrder.js";
import NewPass from "./Routes/Users/NewPass.js";

app.use("/user/get", GetUser);
app.use("/user/edit", SetUser);
app.use("/login", Login);
app.use("/register", Register);
app.use("/confirmAccount", ConfirmAccount);
app.use("/token", Token);
app.use("/user/favorite", Favorite);
app.use("/user/orders", GetOrder);
app.use("/user/order/:id", GetOrder);
app.use("/user/new-pass", NewPass);

/* CART End Points */
import GetCart from "./Routes/Cart/Get.js";
// import MiniCart from "./Routes/Cart/Mini.js";
import AddCart from "./Routes/Cart/Add.js";
import RemoveOne from "./Routes/Cart/RemoveOne.js";
import RemoveCart from "./Routes/Cart/Remove.js";
import ClearCart from "./Routes/Cart/Clear.js";
import TransferCart from "./Routes/Cart/Transfer.js";

app.use("/cart", GetCart);
// app.use("/minicart", MiniCart);
app.use("/cart/add", AddCart);
app.use("/cart/removeOne", RemoveOne);
app.use("/cart/remove/:key", RemoveCart);
app.use("/cart/clear", ClearCart);
app.use("/cart/transfer", TransferCart);

/* PRODUCTS End Points */
import GetById from "./Routes/Product/GetById.js";
import ResponsiveImages from "./Routes/Product/GetResponsiveImageById.js";
import List from "./Routes/Product/List.js";
import Query from "./Routes/Product/Query.js";
import GetShowCaseById from "./Routes/Product/GetShowCaseById.js";
import Search from "./Routes/Product/Search.js";

app.use("/products/:id", GetById);
app.use("/media/:id", ResponsiveImages);
app.use("/products", List);
app.use("/query", Query);
app.use("/products/:id/showcase", GetShowCaseById);
app.use("/search", Search);

/* OTHERS End Points */

/* Root */
import Root from "./Routes/Others/Root.js";
app.use("/", Root);

/* PAGSEGURO End Points */
import PagSeguroInstallments from "./ThirdParty/PagSeguro/Installments.js";
import PagSeguroCards from "./ThirdParty/PagSeguro/Cards.js";
import PagSeguroPaymentMethods from "./ThirdParty/PagSeguro/PaymentMethods.js";
import PagSeguroToken from "./ThirdParty/PagSeguro/Token.js";
import PagSeguroOrderBoleto from "./ThirdParty/PagSeguro/OrderBoleto.js";
import PagSeguroOrderCreditCard from "./ThirdParty/PagSeguro/OrderCreditCard.js";

app.use("/tpps/installments", PagSeguroInstallments);
app.use("/tpps/cards", PagSeguroCards);
app.use("/tpps/payment-methods", PagSeguroPaymentMethods);
app.use("/tpps/token", PagSeguroToken);
app.use("/tpps/payment/boleto", PagSeguroOrderBoleto);
app.use("/tpps/payment/credit-card", PagSeguroOrderCreditCard);

/* 
END OF LIST OF END POINTS 
-----------------------------------------------------------------------
*/

/* Start Express */
const HTTP_PORT = process.env.PORT;

app.listen(HTTP_PORT, () => {
  console.log(
    new Date(),
    `Service using [${ENV}] Server and running on port ${HTTP_PORT}`
  );
});
