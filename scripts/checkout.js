import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-oop.js";

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
