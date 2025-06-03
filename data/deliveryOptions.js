export const deliveryOptions = [{
    id: '1',
    deliveryDays: 5,
    priceCount: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCount: 100,
}, {
    id: '3',
    deliveryDays: 1,
    priceCount: 250
}];


export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option
        }
    });

    return deliveryOption || deliveryOption [0]
}