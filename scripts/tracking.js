import { getProduct, loadProducts } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function getOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  return orders.find(order => order.id === orderId);
}

async function loadPage() {
  try {
    await new Promise((resolve) => loadProducts(resolve));

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const trackingContainer = document.querySelector('.js-order-tracking');

    if (!orderId || !productId) {
      trackingContainer.innerHTML = errorHTML("Invalid tracking information", "Unable to find tracking details for this order.");
      return;
    }

    const order = getOrder(orderId);
    const product = getProduct(productId);

    if (!order || !product) {
      trackingContainer.innerHTML = errorHTML("Order or product not found", "Unable to find tracking details for this order.");
      return;
    }

    const productDetails = order.products.find(p => p.productId === product.id);
    if (!productDetails) {
      trackingContainer.innerHTML = errorHTML("Product not found in order", "Unable to find this product in the specified order.");
      return;
    }

    const today = dayjs();

    const isOld = dayjs(order.orderTime).year() < 2023;
    if (isOld) {
      order.orderTime = today.format('YYYY-MM-DD');
      productDetails.estimatedDeliveryTime = today.add(4, 'day').format('YYYY-MM-DD');
    }

    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

    const totalDays = deliveryTime.diff(orderTime, 'day', true);
    const elapsedDays = today.diff(orderTime, 'day', true);
    const percentProgress = Math.max(0, Math.min(100, (elapsedDays / totalDays) * 100));

    let statusStage = '';
    if (percentProgress < 33.33) {
      statusStage = 'preparing';
    } else if (percentProgress < 100) {
      statusStage = 'shipped';
    } else {
      statusStage = 'delivered';
    }

    const deliveredMessage = statusStage === 'delivered' ? 'Delivered on' : 'Arriving on';

    console.log({
      orderTime: orderTime.format('YYYY-MM-DD'),
      deliveryTime: deliveryTime.format('YYYY-MM-DD'),
      today: today.format('YYYY-MM-DD'),
      totalDays,
      elapsedDays,
      percentProgress: percentProgress.toFixed(2),
      statusStage
    });

    const trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
      <div class="delivery-date">${deliveredMessage} ${deliveryTime.format('dddd, MMMM D')}</div>
      <div class="product-info">${product.name}</div>
      <div class="product-info">Quantity: ${productDetails.quantity}</div>
      <img class="product-image" src="${product.image}" alt="${product.name}">
      <div class="progress-labels-container">
        <div class="progress-label ${statusStage === 'preparing' ? 'current-status' : ''}">Preparing</div>
        <div class="progress-label ${statusStage === 'shipped' ? 'current-status' : ''}">Shipped</div>
        <div class="progress-label ${statusStage === 'delivered' ? 'current-status' : ''}">Delivered</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    `;

    trackingContainer.innerHTML = trackingHTML;

    setTimeout(() => {
      if (window.UniversalEffects) {
        window.UniversalEffects.initAll({
          scroll: ['.js-order-tracking', '.delivery-date', '.product-info', '.product-image', '.progress-labels-container', '.progress-bar-container'],
          hover: ['.product-image', '.delivery-date'],
          buttons: ['.back-to-orders-link']
        });

        setTimeout(() => {
          window.UniversalEffects.startAnimation();
        }, 200);
      }
    }, 100);
  } catch (error) {
    console.error('Tracking page load error:', error);
    document.querySelector('.js-order-tracking').innerHTML = errorHTML("Error loading tracking information", "There was an error loading the tracking details. Please try again.");
  }
}

function errorHTML(title, message) {
  return `
    <div class="error-message">
      <h2>${title}</h2>
      <p>${message}</p>
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    </div>
  `;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPage);
} else {
  loadPage();
}
