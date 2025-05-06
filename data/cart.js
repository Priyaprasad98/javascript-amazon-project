export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);

  let quantity = Number(quantitySelectorElement.value);

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
      quantity
    });
  }
  saveCartStorage();
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
}

export function updateCartQuantity(cart) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}
