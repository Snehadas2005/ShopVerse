import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
import { renderCheckoutHeader } from "./checkout/checkoutheader.js";
import { loadProducts } from "../data/products.js";

renderCheckoutHeader();

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

function loadProductsAsync() {
    return new Promise((resolve) => {
        loadProducts(() => {
            resolve();
        });
    });
}

async function loadPage() {
    console.log('load page');
    try {
        await loadProductsAsync();
        console.log('Products loaded successfully');
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

function renderEmptyCart() {
    const mainElement = document.querySelector('.main');
    mainElement.innerHTML = `
        <div class="empty-cart-container">
            <div class="empty-cart-icon">
                <img src="images/emptycart.png" alt="Empty Cart" class="empty-cart-image">
            </div>
            <h2 class="empty-cart-title">YOUR CART IS EMPTY</h2>
            <div class="empty-cart-buttons">
                <button class="continue-shopping-btn" onclick="window.location.href='index.html'">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;
  
    setTimeout(() => {
        if (window.UniversalEffects) {
            window.UniversalEffects.initScrollAnimations(['.empty-cart-container']);
            window.UniversalEffects.addButtonEffects(['.continue-shopping-btn']);
            window.UniversalEffects.startAnimation();
        }
    }, 100);
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

    setTimeout(() => {
        if (window.UniversalEffects) {
            window.UniversalEffects.initScrollAnimations([
                '.cart-item-container', 
                '.payment-summary',
                '.page-title'
            ]);
            window.UniversalEffects.addHoverEffects([
                '.cart-item-container', 
                '.payment-summary'
            ]);
            window.UniversalEffects.addButtonEffects([
                '.place-order-button',
                '.update-quantity-link',
                '.save-quantity-link',
                '.delete-quantity-link'
            ]);
            window.UniversalEffects.startAnimation();
        }
    }, 100);
}

async function initializeCheckout() {
    try {
        await loadThreeJS();
        
        if (!cart || cart.length === 0) {
            renderEmptyCart();
        } else {
            renderCheckoutContent();
        }
        
        setTimeout(() => {
            if (window.UniversalEffects) {
                const success = window.UniversalEffects.initAll({
                    scroll: ['.cart-item-container', '.payment-summary', '.empty-cart-container', '.page-title'],
                    hover: ['.cart-item-container', '.payment-summary'], 
                    buttons: ['.place-order-button', '.continue-shopping-btn', '.update-quantity-link', '.save-quantity-link', '.delete-quantity-link']
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
        if (!cart || cart.length === 0) {
            renderEmptyCart();
        } else {
            renderCheckoutContent();
        }
    }
}

export function checkForEmptyCart() {
    if (!cart || cart.length === 0) {
        renderEmptyCart();
    }
}

async function initialize() {
    try {
        await loadPage();
        await initializeCheckout();
    } catch (error) {
        console.error('Initialization failed:', error);
        await initializeCheckout();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}