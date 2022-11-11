import voopooSamp from '../fakeapi/img/voopoo.jpg';
import vgodSamp from '../fakeapi/img/vgod-pro.jpg';
import smokSamp from '../fakeapi/img/smok.jpg';

const sales = [
  {
    item: 'Voopo Argus Pro',
    image: voopooSamp,
    price: 13500,
    material: 'Stainless Steel',
    productType: 'Pod Mod Vape',
  },
  {
    item: 'Vgod Pro Mech 2 kit',
    image: vgodSamp,
    price: 575,
    material: 'Stainless Steel',
    productType: 'Box Mod Vape',
  },
  {
    item: 'SMOK Novo 2 Pod Starter Kit',
    image: smokSamp,
    price: 970,
    material: 'Plastic',
    productType: 'Pen Vape',
  },
  {
    item: 'SMOK Novo 2 Pod Starter Kit',
    image: smokSamp,
    price: 970,
    material: 'Plastic',
    productType: 'Pen Vape',
  },
];

export function getSales() {
  return sales;
}
