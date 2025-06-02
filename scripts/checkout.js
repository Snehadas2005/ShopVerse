import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity
} from '../data/cart.js';
import { products } from '../data/products.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct = products.find((product) =>
    product && product.id === productId
  );

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">₹${matchingProduct.priceCount}</div>
          <div class="product-quantity">
            <span>
              Quantity:
              <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                ${cartItem.quantity}
              </span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" min="1" max="3">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">₹50 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">₹100 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();

    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  const quantityElement = document.querySelector('.js-return-to-home-link');
  if (quantityElement) {
    quantityElement.innerHTML = `${cartQuantity} products`;
  }
}

updateCartQuantity();

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  const productId = link.dataset.productId;
  const input = document.querySelector(`.js-quantity-input-${productId}`);

  link.addEventListener('click', () => {
    handleUpdateQuantity(productId, input);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleUpdateQuantity(productId, input);
    }
  });
});

function handleUpdateQuantity(productId, inputElement) {
  const newQuantity = Number(inputElement.value);

  if (newQuantity >= 1 && newQuantity <= 3) {
    updateQuantity(productId, newQuantity);

    const label = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    label.innerHTML = newQuantity;

    updateCartQuantity();
  }

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove('is-editing-quantity');
}
