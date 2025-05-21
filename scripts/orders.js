import { orders } from "../data/orders.js";
import dayjs from "https://esm.sh/dayjs";
import { formatCurrency } from "./utils/money.js";
import { products, loadProductsFetch } from "../data/products.js";
import { addToCart, updateCartQuantity, cart } from "../data/cart.js";
await loadProductsFetch();
let ordersHTML = "";
orders.forEach((order) => {
  const orderTimeString = dayjs(order.orderTime).format("MMMM D");

  ordersHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${productsListHTML(order)}
          </div>
        </div>
    `;
  document.querySelector(".js-order-grid").innerHTML = ordersHTML;
});

document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity(cart);

function productsListHTML(order) {
  let productsListHTML = "";
  let matchingProduct;
  order.products.forEach((productDetail) => {
    products.forEach((product) => {
      if (product.id === productDetail.productId) {
        matchingProduct = product;
      }
    });

    productsListHTML += `
          <div class="product-image-container">
              <img src="${matchingProduct.image}" />
          </div>

          <div class="product-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-delivery-date">Arriving on: ${dayjs(
              productDetail.estimatedDeliveryTime
            ).format("dddd, MMMM D")}</div>
            <div class="product-quantity">Quantity: ${productDetail.quantity}</div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${
              matchingProduct.id
            }">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
              <button class="track-package-button button-secondary">Track package</button>
            </a>
          </div>
      `;
  });
  return productsListHTML;
}

document.querySelectorAll(".js-buy-again-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    console.log(productId);
    addToCart(productId);

    button.innerHTML = "Added";
    setTimeout(() => {
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png" />
        <span class="buy-again-message">Buy it again</span>`;
    }, 1000);

    document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity(cart);
  });
});
