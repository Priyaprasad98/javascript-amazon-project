import { cart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utils/money.js";
(async () => {
  //IIFE (immediately invoked function expression, doesnot need to be called)
  await loadProductsFetch(); //await can be used without async function when the given file ia a module
  let productHTML = ``;
  let timeOutId; //for storing previous timeout before click

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");
  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search) || product.keywords.includes(search);
    });
  }

  filteredProducts.forEach((product) => {
    productHTML += `
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
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${formatCurrency(product.priceCents)}</div>

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
          <div style = "margin: 15px;">${product.extraInfoHTML()}</div>
          
          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
  `;
  });
  document.querySelector(".js-product-grid").innerHTML = productHTML;

  if (updateCartQuantity(cart) === 0) {
    document.querySelector(".js-cart-quantity").innerHTML = "";
  } else {
    document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity(cart);
  }

  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      //const productId = button.dataset.productId;
      const { productId } = button.dataset; //shortcut

      addToCart(productId);

      document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity(cart);

      //for added message display
      const addedToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartMessage.classList.add("js-after-click-add-to-cart");
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        addedToCartMessage.classList.remove("js-after-click-add-to-cart");
      }, 2000);
    });
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `amazon.html?search=${search}`;
  });

  document.querySelector(".js-search-bar").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const search = document.querySelector(".js-search-bar").value;
      window.location.href = `amazon.html?search=${search}`;
    }
  });
})();
