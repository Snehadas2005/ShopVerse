import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";

function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        cartSummaryHTML += 
        `
            <div class="cart-item-container
             js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: Sunday, May 25
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ₹${matchingProduct.priceCount}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">
                                ${cartItem.quantity}
                            </span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary
                            js-delete-link" data-product-id = "${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" checked
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Tuesday, May 27
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Monday, May 26
                                </div>
                                <div class="delivery-option-price">
                                    ₹35.00 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Sunday, May 25
                                </div>
                                <div class="delivery-option-price">
                                    ₹50.00 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}

function attachDeleteListeners() {
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            
            removeFromCart(productId);
            renderOrderSummary();
            attachDeleteListeners(); 
        });
    });
}

renderOrderSummary();
attachDeleteListeners();