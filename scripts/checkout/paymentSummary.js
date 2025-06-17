import { cart, resetCart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary() {
  let productPriceCount = 0;
  let shippingPriceCount = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (product) {
      productPriceCount += product.priceCount * cartItem.quantity;
      totalQuantity += cartItem.quantity;
    }

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (deliveryOption) {
      shippingPriceCount += deliveryOption.priceCount;
    }
  });

  const totalCost = productPriceCount + shippingPriceCount;

  const paymentSummaryHTML = `
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

    <button class="place-order-button button-primary js-place-order">
      Proceed to checkout
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        console.log('Place order clicked, cart:', cart);
        
        if (!cart || cart.length === 0) {
          alert('Your cart is empty!');
          return;
        }

        const validCartItems = cart.filter(cartItem => {
          const product = getProduct(cartItem.productId);
          return product && cartItem.quantity > 0;
        });

        console.log('Valid cart items:', validCartItems); 

        if (validCartItems.length === 0) {
          alert('No valid items in cart!');
          return;
        }

        let orderProductPrice = 0;
        let orderShippingPrice = 0;
        let orderTotalQuantity = 0;

        const orderProducts = validCartItems.map(cartItem => {
          const product = getProduct(cartItem.productId);
          const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
          const deliveryDays = deliveryOption ? deliveryOption.deliveryDays : 7;
          
          orderProductPrice += product.priceCount * cartItem.quantity;
          orderTotalQuantity += cartItem.quantity;
          if (deliveryOption) {
            orderShippingPrice += deliveryOption.priceCount;
          }
          
          return {
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            deliveryOptionId: cartItem.deliveryOptionId,
            estimatedDeliveryTime: dayjs().add(deliveryDays, 'day').format('MMMM D'),
            productPrice: product.priceCount,
            productName: product.name
          };
        });

        const orderTotal = orderProductPrice + orderShippingPrice;
        console.log('Order total calculated:', orderTotal); 

        if (orderProducts.length > 0 && orderTotal > 0) {
          const orderId = generateOrderId();
          
          const order = {
            id: orderId,
            orderTime: dayjs().format('MMMM D'),
            products: orderProducts,
            totalQuantity: orderTotalQuantity,
            productPrice: orderProductPrice,
            shippingPrice: orderShippingPrice,
            totalPrice: orderTotal
          };

          console.log('Creating order:', order); 

          const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
          console.log('Existing orders before:', existingOrders); 

          existingOrders.unshift(order); 
          
          localStorage.setItem('orders', JSON.stringify(existingOrders));
          console.log('Orders saved:', existingOrders); 

          resetCart();
          
          window.location.href = 'orders.html';
        } else {
          alert('Unable to process order. Please check your cart items.');
          console.log('Order creation failed - no valid products or zero total');
        }
        
      } catch (error) {
        console.error('Order processing error:', error);
        alert('There was an error processing your order. Please try again.');
      }
    });
}

function generateOrderId() {
  return Math.random().toString(36).substr(2, 9) + '-' +
         Math.random().toString(36).substr(2, 4) + '-' +
         Math.random().toString(36).substr(2, 4) + '-' +
         Math.random().toString(36).substr(2, 4) + '-' +
         Math.random().toString(36).substr(2, 12);
}