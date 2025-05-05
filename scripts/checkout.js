import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { updateCartQuantity } from "./utils/cartquantity.js";
let cartItemHTML = "";
cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingProduct = product;
    }
  });
  cartItemHTML += `
       <div class="cart-item-container-${productId}">
          <div class="delivery-date">Delivery date: Tuesday, June  
          21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"/>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="js-update-quantity-link link-primary" >
                    Update
                  </span>
                  <span class="js-delete-quantity-link link-primary" data-product-id = ${productId}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}" />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}" />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}" />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

document.querySelector(".js-cart-item-container").innerHTML = cartItemHTML;

updateCheckoutHeading();

//for delete feature
document.querySelectorAll(".js-delete-quantity-link").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.cart-item-container-${productId}`).remove();
    updateCheckoutHeading();
  });
});

//checkout heading
function updateCheckoutHeading() {
  document.querySelector(".js-return-to-home-link").innerHTML = `${updateCartQuantity(cart)} items`;
}
