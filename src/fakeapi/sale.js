import manilaRY4 from '../fakeapi/img/manilaRY4.jpg';
import doubleRY4 from '../fakeapi/img/doubleRY4.jpg';
import strawberryRY4 from '../fakeapi/img/strawberryRY4.jpg';
import pistacioRY4 from '../fakeapi/img/pistacioRY4.jpg';
import custardRY4 from '../fakeapi/img/custardRY4.jpg';
import vanillaWaferRY4 from '../fakeapi/img/vanillaWaferRY4.jpg';

const sales = [
  {
    id: 1,
    flavor: 'Manila RY4',
    nicotineLevel: [15, 20],
    image: manilaRY4,
    price: 200,
    onCart: false,
  },
  {
    id: 2,
    flavor: 'Double RY4',
    nicotineLevel: [15, 20],
    image: doubleRY4,
    price: 200,
    onCart: false,
  },
  {
    id: 3,
    flavor: 'Pistacio RY4',
    nicotineLevel: [15, 20],
    image: pistacioRY4,
    price: 200,
    onCart: false,
  },
  {
    id: 4,
    flavor: 'Custard RY4',
    nicotineLevel: [15, 20],
    image: custardRY4,
    price: 200,
    onCart: false,
  },
  {
    id: 5,
    flavor: 'Strawberry RY4',
    nicotineLevel: [15, 20],
    image: strawberryRY4,
    price: 200,
    onCart: false,
  },
  {
    id: 6,
    flavor: 'Vanilla Wafer RY4',
    nicotineLevel: [15, 20],
    image: vanillaWaferRY4,
    price: 200,
    onCart: false,
  },
];

export const getSales = () => {
  return sales;
};
