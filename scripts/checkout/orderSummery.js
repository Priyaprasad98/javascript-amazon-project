import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateNewQuantity,
  updateDeliveryOption
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { deliveryOption } from "../../data/delivery.js";
import dayjs from "https://esm.sh/dayjs";
export function renderOrderSummery() {
  let cartItemHTML = "";
  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    let dateString;
    deliveryOption.forEach((option) => {
      if (option.id === cartItem.deliveryId) {
        const deliveryDate = dayjs().add(option.deliveryDays, "day");
        dateString = deliveryDate.format("dddd, MMMM D");
      }
    });

    cartItemHTML += `
       <div class="cart-item-container-${productId}">
          <div class="delivery-date js-delivery-date">Delivery date: ${dateString}</div>

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
                 ${displayDeliveryOption(matchingProduct, cartItem)}


              </div>
            </div>
          </div>
  `;
  });

  function displayDeliveryOption(matchingProduct, cartItem) {
    let html = ``;

    const today = dayjs();
    deliveryOption.forEach((option) => {
      const deliveryDate = today.add(option.deliveryDays, "day");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        option.deliveryPriceCents === 0 ? "FREE" : `-$${formatCurrency(option.deliveryPriceCents)}`;

      const isChecked = option.id === cartItem.deliveryId ? "checked" : "";

      html += `
      <div class="delivery-option js-delivery-option" data-delivery-id="${option.id}"
      data-product-id="${matchingProduct.id}">
        <input
         type="radio"
            ${isChecked}
              class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" />
                <div>
                  <div class="delivery-option-date">${dateString}</div>
                  <div class="delivery-option-price">${priceString} Shipping</div>
                </div>
        </div>
    `;
    });

    return html;
  }

  document.querySelector(".js-cart-item-container").innerHTML = cartItemHTML;

  updateCheckoutHeading();

  //checkout heading
  function updateCheckoutHeading() {
    document.querySelector(".js-return-to-home-link").innerHTML = `${updateCartQuantity(
      cart
    )} items`;
  }

  //for delete feature
  document.querySelectorAll(".js-delete-quantity-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      // document.querySelector(`.cart-item-container-${productId}`).remove();
      updateCheckoutHeading();
      renderOrderSummery();
    });
  });

  //update feature
  document.querySelectorAll(".js-update-quantity-link").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const productId = updateLink.dataset.productId;
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

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { deliveryId, productId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummery();
    });
  });
}
