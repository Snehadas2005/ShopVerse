import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";

function renderEmptyCart() {
  const mainElement = document.querySelector('.main');
  mainElement.innerHTML = `
    <div class="empty-cart-container">
      <div class="empty-cart-icon">
        <img src="images/emptycart.png" alt="Empty Cart" class="empty-cart-image">
      </div>
      <h2 class="empty-cart-title">YOUR CART IS EMPTY</h2>
      <div class="empty-cart-buttons">
        <button class="continue-shopping-btn" onclick="window.location.href='shopverse.html'">
          Continue Shopping
        </button>
      </div>
    </div>
  `;
}

function renderCheckoutContent() {
  const mainElement = document.querySelector('.main');
  mainElement.innerHTML = `
    <div class="page-title">Review your order</div>
    <div class="checkout-grid">
      <div class="order-summary js-order-summary"></div>
      <div class="payment-summary js-payment-summary"></div>
    </div>
  `;
  
  renderOrderSummary();
  renderPaymentSummary();
}

function initializeCheckout() {
  
  if (!cart || cart.length === 0) {
    renderEmptyCart();
  } else {
    renderCheckoutContent();
  }
}


export function checkForEmptyCart() {
  if (!cart || cart.length === 0) {
    renderEmptyCart();
  }
}

initializeCheckout();