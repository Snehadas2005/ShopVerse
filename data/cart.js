//import { resetCart } from '../data/cart.js'; 

// removecart(); //USE IT ONLY WHEN THE CHECKOUT PAGE ISN'T WORKING 

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

if (!cart) {
    cart = [{
        productId: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
        newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function resetCart() {
    cart = [];
    localStorage.removeItem('cart');
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
        matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            matchingItem.quantity = newQuantity;
            saveToStorage();
        }
    }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
        matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    }
}