export let cart = JSON.parse(localStorage.getItem("cart")) || [];
// if (!cart) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 2
//     },
//     {
//       productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
//       quantity: 4
//     },
//     {
//       productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//       quantity: 2
//     }
//   ];
// }

function saveCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);

  //console.log(quantitySelectorElement);
  let quantity = Number(quantitySelectorElement.value);
  console.log(quantity);

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
