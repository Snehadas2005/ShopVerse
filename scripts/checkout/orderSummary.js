import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = products.find((product) =>
      product && product.id === productId
    );

    const deliveryOptionId = cartItem.deliveryOptionId || '1';
    const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
      
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, D MMM');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, D MMM');
      const priceString = deliveryOption.priceCount === 0 
        ? 'FREE'
        : `₹${deliveryOption.priceCount} `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            value = "${deliveryOption.id}"
            data-product-id = "${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} For Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
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
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
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

      const label = document.querySelector(`.js-quantity-label-${productId}`);
      label.innerHTML = newQuantity;

      updateCartQuantity();
    }

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
  }

  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('click', () => {
      const productId = input.dataset.productId;
      const deliveryOptionId = input.value;

      const matchingItem = cart.find((item) => item.productId === productId);
      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach ((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      })
    });
}