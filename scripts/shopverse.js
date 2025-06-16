import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

    let productsHTML = '';

    products.forEach((product) => {
        productsHTML += `
            <div class="product-container product-animate" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ₹${product.priceCount}
                </div>

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

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    function initHeaderScroll() {
        const header = document.querySelector('.shopverse-header');
        let lastScrollY = window.scrollY;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    updateCartQuantity();

    const addedMessageTimeouts = {};

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            const selectedQuantity = parseInt(quantitySelector.value);
            
            addToCart(productId, selectedQuantity);
            updateCartQuantity();
            
            const addedMessage = document.querySelector(
                `.js-added-to-cart-${productId}`
            );
            
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

    function initShopversePage() {
        initHeaderScroll();
        
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

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Shopverse DOM loaded, initializing...');
        initShopversePage();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShopversePage);
    } else {
        initShopversePage();
    }
}