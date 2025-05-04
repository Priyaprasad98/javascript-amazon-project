import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productHTML = ``;
let timeOutId; //for storing previous timeout before click
products.forEach((product) => {
  const html = `
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
  `;
  productHTML += html; //doubt
});
document.querySelector(".js-product-grid").innerHTML = productHTML;
/* document.querySelectorAll(".js-add-to-cart-button") selects all the elements on the page that have the class js-add-to-cart-button (which, in this case, are the "Add to Cart" buttons).

.forEach() goes through each button, one at a time. It loops over all the buttons only once when the page loads.

Example:
If you have 5 buttons on the page, .forEach() will loop 5 times:

On the first loop: It attaches an event listener to the first button.

On the second loop: It attaches an event listener to the second button, and so on.

The event listener is attached to each button once when the page is first loaded.

What does this mean for clicks?
After the page loads and the event listeners are set up, clicking any button will not cause .forEach() to loop over all the buttons again.

The click will only trigger the code inside the event listener that was attached to the button that was clicked.*/
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    //const productId = button.dataset.productId;
    const { productId } = button.dataset; //shortcut

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
    console.log(cart);

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    //.log(cartQuantity);

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    const addedToCartMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedToCartMessage.classList.add("js-after-click-add-to-cart");

    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      addedToCartMessage.classList.remove("js-after-click-add-to-cart");
    }, 2000);
  });
});
