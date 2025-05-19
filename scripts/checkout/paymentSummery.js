import { cart, updateCartQuantity } from "../../data/cart.js";
import { deliveryOption } from "../../data/delivery.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummery() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        productPriceCents += product.priceCents * cartItem.quantity;
      }
    });

    deliveryOption.forEach((option) => {
      if (option.id === cartItem.deliveryId) {
        shippingPriceCents += option.deliveryPriceCents;
      }
    });
  });
  const totalBeforeTax = productPriceCents + shippingPriceCents;

  const estimatedTaxCents = totalBeforeTax * 0.1;

  const totalCents = totalBeforeTax + estimatedTaxCents;

  let html = `
            <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity(cart)}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">Place your order</button>
`;
  document.querySelector(".js-payment-summery").innerHTML = html;

  document.querySelector(".js-place-order-button").addEventListener("click", async () => {
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await response.json();
      addOrder(order);
    } catch (error) {
      console.log("unexpected error. Try again later.");
    }

    window.location.href = "orders.html";
  });
}
