import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      if (Array.isArray(product.keywords)) {
        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });
      }

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container product-animate" data-product-id="${product.id}">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
        <div class="product-name limit-text-to-2-lines">${product.name}</div>
        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>
        <div class="product-price">₹${product.priceCount}</div>
        ${product.extraInfoHTML()}
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  initializeAllFunctionality();
}

function initializeAllFunctionality() {
  initClothingSizeChart();
  initFootwearSizeChart();
  initHeaderScroll();
  updateCartQuantity();
  initAddToCartButtons();
  initShopversePage();
}

function initClothingSizeChart() {
  const modal = document.querySelector('.js-clothing-size-chart-modal');
  const backdrop = document.querySelector('.js-clothing-size-chart-backdrop');
  const closeBtn = document.querySelector('.js-clothing-size-chart-close');
  const cmBtn = document.querySelector('.js-clothing-unit-cm');
  const inchBtn = document.querySelector('.js-clothing-unit-inch');
  const cmChart = document.querySelector('.js-clothing-size-chart-cm');
  const inchChart = document.querySelector('.js-clothing-size-chart-inch');

  if (cmBtn && inchBtn && cmChart && inchChart) {
    cmBtn.addEventListener('click', () => {
      cmBtn.classList.add('active');
      inchBtn.classList.remove('active');
      cmChart.style.display = 'block';
      inchChart.style.display = 'none';
    });

    inchBtn.addEventListener('click', () => {
      inchBtn.classList.add('active');
      cmBtn.classList.remove('active');
      inchChart.style.display = 'block';
      cmChart.style.display = 'none';
    });
  }

  document.querySelectorAll('.js-clothing-size-chart-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeClothingSizeChart() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeClothingSizeChart);
  if (backdrop) backdrop.addEventListener('click', closeClothingSizeChart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeClothingSizeChart();
    }
  });
}

function initFootwearSizeChart() {
  const modal = document.querySelector('.js-footwear-size-chart-modal');
  const backdrop = document.querySelector('.js-footwear-size-chart-backdrop');
  const closeBtn = document.querySelector('.js-footwear-size-chart-close');

  document.querySelectorAll('.js-footwear-size-chart-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeFootwearSizeChart() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeFootwearSizeChart);
  if (backdrop) backdrop.addEventListener('click', closeFootwearSizeChart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeFootwearSizeChart();
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.shopverse-header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

function initAddToCartButtons() {
  const addedMessageTimeouts = {};
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const selectedQuantity = quantitySelector ? parseInt(quantitySelector.value) : 1;

      addToCart(productId, selectedQuantity);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      if (addedMessage) {
        addedMessage.classList.add('added-to-cart-visible');
        if (addedMessageTimeouts[productId]) {
          clearTimeout(addedMessageTimeouts[productId]);
        }
        addedMessageTimeouts[productId] = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
          delete addedMessageTimeouts[productId];
        }, 2000);
      }

      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

function initShopversePage() {
  if (window.UniversalEffects) {
    window.UniversalEffects.initAll({
      scroll: ['.product-animate'],
      hover: ['.product-container'],
      buttons: ['.add-to-cart-button']
    });
  } else {
    console.log('Universal effects not available, waiting...');
    setTimeout(() => {
      if (window.UniversalEffects) {
        window.UniversalEffects.initAll({
          scroll: ['.product-animate'],
          hover: ['.product-container'],
          buttons: ['.add-to-cart-button']
        });
      }
    }, 500);
  }
}