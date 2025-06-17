import { getProduct } from './products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addToCart, calculateCartQuantity } from './cart.js';

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('orders')) || [];
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return [];
  }
}

function getImagePath(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
  return `${imagePath}`;
}

function updateCartQuantityUI() {
  const quantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = quantity;
  }
}

function renderEmptyOrders() {
  const ordersGrid = document.querySelector('.orders-grid');
  ordersGrid.innerHTML = `
    <div class="empty-cart-container">
      <div class="empty-cart-icon">
        <img src="images/emptycart.png" alt="Empty cart" class="empty-cart-image">
      </div>
      <h2 class="empty-cart-title">NO ORDERS YET</h2>
      <p class="empty-orders-message">Looks like you haven't placed any orders yet.</p>
      <div class="empty-cart-buttons">
        <button class="continue-shopping-btn" onclick="window.location.href='index.html'">
          Start Shopping
        </button>
      </div>
    </div>
  `;
}

function productsListHTML(order) {
  let html = '';
  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    const imagePath = getImagePath(product?.image || '');

    html += `
      <div class="product-image-container">
        <img src="${imagePath}" alt="${product?.name || 'Unknown Product'}" />
      </div>
      <div class="product-details">
        <div class="product-name">${product?.name || 'Unknown Product'}</div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
        </div>
        <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${productDetails.productId}">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
          <button class="track-package-button button-secondary">Track package</button>
        </a>
      </div>
    `;
  });

  return html;
}

async function loadPage() {
  try {
    const orders = getOrders();
    if (!orders.length) {
      renderEmptyOrders();
      return;
    }

    let ordersHTML = '';

    orders.forEach((order) => {
      let total = 0;
      order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);
        if (product) total += product.priceCount * productDetails.quantity;
      });

      ordersHTML += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹${total}</div>
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
        updateCartQuantityUI();

        btn.innerHTML = 'Added';
        setTimeout(() => {
          btn.innerHTML = '<span class="buy-again-message">Buy it again</span>';
        }, 1000);
      });
    });

    updateCartQuantityUI();
  } catch (err) {
    console.error('Failed to load orders page:', err);
    renderEmptyOrders();
  }
}

async function initializeOrders() {
  try {
    await loadPage();

    setTimeout(() => {
      if (window.UniversalEffects) {
        window.UniversalEffects.initAll({
          scroll: [
            '.order-container',
            '.product-image-container',
            '.product-details',
            '.product-actions',
            '.page-title',
            '.empty-cart-container'
          ],
          hover: [
            '.order-container',
            '.product-image-container',
            '.product-details'
          ],
          buttons: [
            '.buy-again-button',
            '.track-package-button',
            '.continue-shopping-btn'
          ]
        });
      }
    }, 300);
  } catch (error) {
    console.error('Orders initialization failed:', error);
    await loadPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOrders);
} else {
  initializeOrders();
}
