import { cart, removeFromCart, updateCartQuantity, updateNewQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../data/utils/money.js";
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
                <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity"> Quantity: <span class="js-quantity-label-${productId}">${
    cartItem.quantity
  }</span> 
                  <span class=" update-quantity-link js-update-quantity-link link-primary" data-product-id = ${productId} >Update</span>
                  <input class="quantity-input js-quantity-input-${productId}">
                  <span class = "save-quantity-link js-save-quantity-link link-primary" data-product-id = ${productId}>Save</span>
                  <span class="js-delete-quantity-link link-primary" data-product-id = ${productId}>
                    Delete
                  </span>
                  <div class="invalid-quantity-message js-invalid-message"></div>
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

//checkout heading
function updateCheckoutHeading() {
  document.querySelector(".js-return-to-home-link").innerHTML = `${updateCartQuantity(cart)} items`;
}

//for delete feature
document.querySelectorAll(".js-delete-quantity-link").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.cart-item-container-${productId}`).remove();
    updateCheckoutHeading();
  });
});

//update feature
document.querySelectorAll(".js-update-quantity-link").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;
    console.log(productId);
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.add("is-editing-quantity"); //we used container to access that <input> and <span> of save simultaneously change their display to initials
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
  const productId = saveLink.dataset.productId;
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

  //click event
  saveLink.addEventListener("click", () => {
    handleUpdateQuantity(productId, quantityInput);
  });

  //keydown event
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleUpdateQuantity(productId, quantityInput);
    }
  });
});

function handleUpdateQuantity(productId, quantityInput) {
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 0 || newQuantity >= 1000) {
    alert("Quantity must be least 0 and less than 1000");
  } else {
    updateNewQuantity(productId, newQuantity);
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;
    updateCheckoutHeading();
    console.log(cart);
  }

  document
    .querySelector(`.cart-item-container-${productId}`)
    .classList.remove("is-editing-quantity");

  quantityInput.value = "";
}
