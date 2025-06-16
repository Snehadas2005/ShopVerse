import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addToCart } from './cart.js';

const orders = JSON.parse(localStorage.getItem('orders')) || [];

function loadThreeJS() {
  return new Promise((resolve, reject) => {
    if (typeof THREE !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Three.js'));
    document.head.appendChild(script);
  });
}

function renderEmptyOrders() {
  const ordersGrid = document.querySelector('.orders-grid');
  ordersGrid.innerHTML = `
    <div class="empty-orders-container">
      <div class="empty-orders-icon">
        <img src="images/empty-orders.png" alt="No Orders" class="empty-orders-image">
      </div>
      <h2 class="empty-orders-title">NO ORDERS YET</h2>
      <p class="empty-orders-message">Looks like you haven't placed any orders yet.</p>
      <div class="empty-orders-buttons">
        <button class="start-shopping-btn" onclick="window.location.href='index.html'">
          Start Shopping
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.UniversalEffects) {
      window.UniversalEffects.initScrollAnimations(['.empty-orders-container']);
      window.UniversalEffects.addButtonEffects(['.start-shopping-btn']);
      window.UniversalEffects.startAnimation();
    }
  }, 100);
}

function productsListHTML(order) {
  let html = '';

  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    if (!product) return;

    html += `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
        </div>
        <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">Track package</button>
        </a>
      </div>
    `;
  });

  return html;
}

async function loadPage() {
  try {
    await loadProductsFetch();

    if (!orders || orders.length === 0) {
      renderEmptyOrders();
      return;
    }

    let ordersHTML = '';

    orders.forEach((order) => {
      const orderTime = dayjs(order.orderTime).format('MMMM D');
      let total = 0;

      order.products.forEach((p) => {
        const prod = getProduct(p.productId);
        if (prod) total += prod.priceCents * p.quantity;
      });

      ordersHTML += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹${(total / 100).toFixed(2)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
      `;
    });

    document.querySelector('.orders-grid').innerHTML = ordersHTML;

    document.querySelectorAll('.js-buy-again').forEach((btn) => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.productId);
        btn.innerHTML = 'Added';
        setTimeout(() => {
          btn.innerHTML = '<span class="buy-again-message">Buy it again</span>';
        }, 1000);
      });
    });

    setTimeout(() => {
      if (window.UniversalEffects) {
        window.UniversalEffects.initScrollAnimations([
          '.order-container',
          '.product-image-container',
          '.product-details',
          '.product-actions',
          '.page-title'
        ]);
        window.UniversalEffects.addHoverEffects([
          '.order-container',
          '.product-image-container',
          '.product-details'
        ]);
        window.UniversalEffects.addButtonEffects([
          '.buy-again-button',
          '.track-package-button'
        ]);
        window.UniversalEffects.startAnimation();
      }
    }, 100);
  } catch (err) {
    console.error('Failed to load orders page:', err);
    renderEmptyOrders();
  }
}

async function initializeOrders() {
  try {
    await loadThreeJS();
    await loadPage();

    setTimeout(() => {
      if (window.UniversalEffects) {
        const success = window.UniversalEffects.initAll({
          scroll: [
            '.order-container',
            '.product-image-container',
            '.product-details',
            '.product-actions',
            '.page-title',
            '.empty-orders-container'
          ],
          hover: [
            '.order-container',
            '.product-image-container',
            '.product-details'
          ],
          buttons: [
            '.buy-again-button',
            '.track-package-button',
            '.start-shopping-btn'
          ]
        });

        if (success) {
          setTimeout(() => {
            window.UniversalEffects.startAnimation();
          }, 200);
        }
      }
    }, 100);
  } catch (error) {
    console.error('Failed to initialize Three.js:', error);
    await loadPage();
  }
}

async function initialize() {
  try {
    await initializeOrders();
  } catch (error) {
    console.error('Orders initialization failed:', error);
    await loadPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}