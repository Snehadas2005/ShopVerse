export let cart = [];

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    }); 

    const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
    );

    const quantity = Number(quantitySelector.value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity
        });
    };
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId != productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}