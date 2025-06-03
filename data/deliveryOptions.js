import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format(
    'dddd, D MMM'
  );

  return dateString;
}