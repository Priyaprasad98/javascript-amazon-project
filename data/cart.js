export const cart = [];

export function addToCart(productId) {
  const quantitySelectorElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  //console.log(quantitySelectorElement);
  let quantity = Number(quantitySelectorElement.value);
  console.log(quantity);

  let matchedItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      //item.id
      //item.id
      matchedItem = item;
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
}
