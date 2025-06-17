import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function getOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  return orders.find(order => order.id === orderId);
}

async function loadPage() {
  try {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    if (!orderId || !productId) {
      document.querySelector('.js-order-tracking').innerHTML = `
        <div class="error-message">
          <h2>Invalid tracking information</h2>
          <p>Unable to find tracking details for this order.</p>
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
        </div>
      `;
      return;
    }

    const order = getOrder(orderId);
    const product = getProduct(productId);

    if (!order || !product) {
      document.querySelector('.js-order-tracking').innerHTML = `
        <div class="error-message">
          <h2>Order or product not found</h2>
          <p>Unable to find tracking details for this order.</p>
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
        </div>
      `;
      return;
    }

    let productDetails;
    order.products.forEach((details) => {
      if (details.productId === product.id) {
        productDetails = details;
      }
    });

    if (!productDetails) {
      document.querySelector('.js-order-tracking').innerHTML = `
        <div class="error-message">
          <h2>Product not found in order</h2>
          <p>Unable to find this product in the specified order.</p>
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
        </div>
      `;
      return;
    }

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = Math.min(100, Math.max(0, ((today - orderTime) / (deliveryTime - orderTime)) * 100));

    const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

    const trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${product.image}" alt="${product.name}">

      <div class="progress-labels-container">
        <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

    setTimeout(() => {
      if (window.UniversalEffects) {
        window.UniversalEffects.initAll({
          scroll: ['.js-order-tracking', '.delivery-date', '.product-info', '.product-image'],
          hover: ['.product-image', '.delivery-date'],
          buttons: ['.back-to-orders-link']
        });
        
        setTimeout(() => {
          window.UniversalEffects.startAnimation();
        }, 200);
      }
    }, 100);
  } catch (error) {
    console.error('Error loading tracking page:', error);
    document.querySelector('.js-order-tracking').innerHTML = `
      <div class="error-message">
        <h2>Error loading tracking information</h2>
        <p>There was an error loading the tracking details. Please try again.</p>
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPage);
} else {
  loadPage();
}