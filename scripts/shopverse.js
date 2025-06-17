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
        <div class="size-chart-modal js-clothing-size-chart-modal">
            <div class="size-chart-backdrop js-clothing-size-chart-backdrop"></div>
            <div class="size-chart-content">
                <div class="size-chart-header">
                    <h2>Women's Clothing Size Chart</h2>
                    <div class="unit-toggle">
                        <button class="unit-btn active js-clothing-unit-cm">CM</button>
                        <button class="unit-btn js-clothing-unit-inch">INCH</button>
                    </div>
                    <button class="size-chart-close js-clothing-size-chart-close">&times;</button>
                </div>
                <div class="size-chart-body">
                    <div class="size-chart-cm js-clothing-size-chart-cm">
                        <table class="size-chart-table">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Bust (cm)</th>
                                    <th>Waist (cm)</th>
                                    <th>Hips (cm)</th>
                                    <th>Front Length (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>XS</strong></td>
                                    <td>85</td>
                                    <td>80</td>
                                    <td>90</td>
                                    <td>115</td>
                                </tr>
                                <tr>
                                    <td><strong>S</strong></td>
                                    <td>91</td>
                                    <td>86</td>
                                    <td>96.5</td>
                                    <td>117</td>
                                </tr>
                                <tr>
                                    <td><strong>M</strong></td>
                                    <td>95</td>
                                    <td>90</td>
                                    <td>100</td>
                                    <td>115</td>
                                </tr>
                                <tr>
                                    <td><strong>L</strong></td>
                                    <td>100</td>
                                    <td>95</td>
                                    <td>105</td>
                                    <td>115</td>
                                </tr>
                                <tr>
                                    <td><strong>XL</strong></td>
                                    <td>105</td>
                                    <td>100</td>
                                    <td>110</td>
                                    <td>115</td>
                                </tr>
                                <tr>
                                    <td><strong>XXL</strong></td>
                                    <td>110</td>
                                    <td>105</td>
                                    <td>115</td>
                                    <td>115</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="size-chart-inch js-clothing-size-chart-inch" style="display: none;">
                        <table class="size-chart-table">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Bust (in)</th>
                                    <th>Waist (in)</th>
                                    <th>Hips (in)</th>
                                    <th>Front Length (in)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>XS</strong></td>
                                    <td>34</td>
                                    <td>32</td>
                                    <td>36</td>
                                    <td>46</td>
                                </tr>
                                <tr>
                                    <td><strong>S</strong></td>
                                    <td>36</td>
                                    <td>34</td>
                                    <td>38</td>
                                    <td>46</td>
                                </tr>
                                <tr>
                                    <td><strong>M</strong></td>
                                    <td>38</td>
                                    <td>36</td>
                                    <td>40</td>
                                    <td>46</td>
                                </tr>
                                <tr>
                                    <td><strong>L</strong></td>
                                    <td>40</td>
                                    <td>38</td>
                                    <td>42</td>
                                    <td>46</td>
                                </tr>
                                <tr>
                                    <td><strong>XL</strong></td>
                                    <td>42</td>
                                    <td>40</td>
                                    <td>44</td>
                                    <td>46</td>
                                </tr>
                                <tr>
                                    <td><strong>XXL</strong></td>
                                    <td>44</td>
                                    <td>42</td>
                                    <td>46</td>
                                    <td>46</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="size-chart-note">
                        <p><strong>Note:</strong> Measurements are approximate and may vary slightly. For the best fit, we recommend measuring yourself and comparing with the chart above.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    productsHTML += `
        <div class="size-chart-modal js-footwear-size-chart-modal">
            <div class="size-chart-backdrop js-footwear-size-chart-backdrop"></div>
            <div class="size-chart-content">
                <div class="size-chart-header">
                    <h2>Women's Shoe Size Conversion Chart</h2>
                    <button class="size-chart-close js-footwear-size-chart-close">&times;</button>
                </div>
                <div class="size-chart-body">
                    <div class="size-chart-footwear">
                        <table class="size-chart-table">
                            <thead>
                                <tr>
                                    <th>UK Size</th>
                                    <th>US Size</th>
                                    <th>EUR Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>2</strong></td>
                                    <td>4</td>
                                    <td>34-35</td>
                                </tr>
                                <tr>
                                    <td><strong>2.5</strong></td>
                                    <td>4.5</td>
                                    <td>35</td>
                                </tr>
                                <tr>
                                    <td><strong>3</strong></td>
                                    <td>5</td>
                                    <td>35-36</td>
                                </tr>
                                <tr>
                                    <td><strong>3.5</strong></td>
                                    <td>5.5</td>
                                    <td>36</td>
                                </tr>
                                <tr>
                                    <td><strong>4</strong></td>
                                    <td>6</td>
                                    <td>36-37</td>
                                </tr>
                                <tr>
                                    <td><strong>4.5</strong></td>
                                    <td>6.5</td>
                                    <td>37</td>
                                </tr>
                                <tr>
                                    <td><strong>5</strong></td>
                                    <td>7</td>
                                    <td>37-38</td>
                                </tr>
                                <tr>
                                    <td><strong>5.5</strong></td>
                                    <td>7.5</td>
                                    <td>38</td>
                                </tr>
                                <tr>
                                    <td><strong>6</strong></td>
                                    <td>8</td>
                                    <td>38-39</td>
                                </tr>
                                <tr>
                                    <td><strong>6.5</strong></td>
                                    <td>8.5</td>
                                    <td>39</td>
                                </tr>
                                <tr>
                                    <td><strong>7</strong></td>
                                    <td>9</td>
                                    <td>39-40</td>
                                </tr>
                                <tr>
                                    <td><strong>7.5</strong></td>
                                    <td>9.5</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td><strong>8</strong></td>
                                    <td>10</td>
                                    <td>40-41</td>
                                </tr>
                                <tr>
                                    <td><strong>8.5</strong></td>
                                    <td>10.5</td>
                                    <td>41</td>
                                </tr>
                                <tr>
                                    <td><strong>9</strong></td>
                                    <td>11</td>
                                    <td>41-42</td>
                                </tr>
                                <tr>
                                    <td><strong>9.5</strong></td>
                                    <td>11.5</td>
                                    <td>42</td>
                                </tr>
                                <tr>
                                    <td><strong>10</strong></td>
                                    <td>12</td>
                                    <td>42-43</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="size-chart-note">
                        <p><strong>Note:</strong> Shoe sizes may vary between brands and styles. We recommend trying on shoes or checking individual product size guides when available.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
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