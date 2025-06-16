import { cart, resetCart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary() {
    let productPriceCount = 0;
    let shippingPriceCount = 0;
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCount += product.priceCount * cartItem.quantity;
        totalQuantity += cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);        
        shippingPriceCount += deliveryOption.priceCount;
    });

    const totalCost = productPriceCount + shippingPriceCount;

    const paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">
                ₹${productPriceCount}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                ₹${shippingPriceCount}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                ₹${totalCost}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Proceed to checkout
        </button>
    `

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML ;

    document.querySelector('.place-order-button')
     .addEventListener('click', () => {
    const order = {
      id: crypto.randomUUID(),
      orderTime: new Date(),
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTime: dayjs().add(9, 'day').toDate()
      }))
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    resetCart(); 
    window.location.href = 'orders.html';
  });
        
}