import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadCartFetch } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]); //here loadCartFetch() is async so it return promise and we are returing promise by ourself from non async function loadProductFetch()
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }
  renderOrderSummery();
  renderPaymentSummery();
}
loadPage();
