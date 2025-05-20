import { renderPaymentSummery } from "../scripts/checkout/paymentSummery.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//console.log(cart);
export function addToCart(productId) {
  const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
  // console.log(quantitySelectorElement); //gives null for oders.js page's buy again button
  let quantity = quantitySelectorElement ? Number(quantitySelectorElement.value) : 1;

  let matchedItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      //item.id
      //item.id
      matchedItem = cartItem;
    }
  });
  if (matchedItem) {
    matchedItem.quantity += quantity;
  } else {
    cart.push({
      //id: productId,
      //quantity: 1,
      //productId: productId,
      //quantity: quantity, //here changes to quantity bcz in dropdown menu there will be 1 selected as default. and changes id to productId so we can use shortcut ie,
      productId,
      quantity,
      deliveryId: "1"
    });
  }
  saveCartStorage();
  console.log(cart);
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveCartStorage();
  renderPaymentSummery();
}

export function updateCartQuantity(cart) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateNewQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
    saveCartStorage();
    renderPaymentSummery();
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  // Match the cart item with the selected product ID
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.deliveryId = deliveryOptionId;
    }
  });
  saveCartStorage();
  renderPaymentSummery();
}

// export function loadCart(fun) {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener("load", () => {
//     console.log(xhr.response);
//     fun();
//   });

//   xhr.open("GET", "https://supersimplebackend.dev/cart");
//   xhr.send();
// }

export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();

  return text; //text=load Cart from backend
}
