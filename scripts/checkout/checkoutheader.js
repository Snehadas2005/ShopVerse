import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
    let cartQuantity = 0;

    cart.forEach((carItem) => {
        cartQuantity += carItem.quantity;
    });

    const checkoutHeaderHTML = 
    `
        <div class="checkout-header">
            <div class="header-content">
                <div class="checkout-hhttps://www.learncbse.in/ncert-solutions-for-class-8-english-honeydew-bepin-choudhurys-lapse-of-memory/#google_vignetteeader-left-section">
                <a href="index.html">
                    <img class="shopverse-logo" src="images/shopverse-black.png">
                    <img class="shopverse-mobile-logo" src="images/logo-black.png">
                </a>
                </div>

                <div class="checkout-header-middle-section">
                <a class="return-to-home-link js-return-to-home-link"
                    href="index.html"></a>
                </div>

                <div class="checkout-header-right-section">
                    <img src="images/icons/checkout-lock-icon.png">
                </div>
            </div>
        </div>  
    `

    document.querySelector('.js-checkout-header')
        .innerHTML = checkoutHeaderHTML;
}