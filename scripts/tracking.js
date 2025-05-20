import { orders } from "../data/orders.js";
import dayjs from "https://esm.sh/dayjs";
import { loadProductsFetch, products } from "../data/products.js";
async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  let productDetails;
  matchingOrder.products.forEach((details) => {
    if (details.productId === matchingProduct.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
     <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>

     <div class="delivery-date">Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format(
       "dddd MMMM D"
     )}</div>

        <div class="product-info">${matchingProduct.name}</div>

        <div class="product-info">Quantity: ${productDetails.quantity}</div>

        <img class="product-image" src="${matchingProduct.image}" />

        <div class="progress-labels-container">
          <div class="progress-label 
          ${percentProgress < 50 ? "current-status" : ""}">Preparing</div>
          <div class="progress-label 
          ${percentProgress >= 50 && percentProgress < 100 ? "current-status" : ""}">Shipped</div>
          <div class="progress-label ${
            percentProgress >= 100 ? "current-status" : ""
          }">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
`;
  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}
loadPage();
