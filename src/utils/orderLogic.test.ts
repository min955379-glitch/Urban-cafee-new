import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterMenuItems,
  calculateCartSummary,
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  buildBirthdayBookingMessage,
  type MenuItem,
  type CartItem,
} from './orderLogic';

const sampleMenu: MenuItem[] = [
  {
    id: 'steak-moroccan',
    name: 'Moroccan Steak',
    category: 'Steaks',
    description: 'Sizzling char-grilled steak with Moroccan spice sauce.',
    price: 'Rs. ---',
    numericPrice: null,
    popular: true,
  },
  {
    id: 'pasta-creamy-alfredo',
    name: 'Creamy Alfredo Pasta',
    category: 'Pasta',
    description: 'Fettuccine in parmesan-garlic cream sauce.',
    price: 'Rs. ---',
    numericPrice: null,
    popular: true,
  },
  {
    id: 'salad-russian',
    name: 'Creamy Russian Salad',
    category: 'Salads',
    description: 'Chilled fruit and vegetable salad.',
    price: 'Rs. ---',
    numericPrice: null,
    popular: false,
  },
];

test('filterMenuItems filters Popular items and category items accurately', () => {
  const popular = filterMenuItems(sampleMenu, 'Popular', '');
  assert.equal(popular.length, 2);

  const steaks = filterMenuItems(sampleMenu, 'Steaks', '');
  assert.equal(steaks.length, 1);
  assert.equal(steaks[0].name, 'Moroccan Steak');

  const search = filterMenuItems(sampleMenu, 'Steaks', 'alfredo');
  assert.equal(search.length, 1);
  assert.equal(search[0].name, 'Creamy Alfredo Pasta');
});

test('calculateCartSummary omits numeric total when placeholder prices are used', () => {
  const cart: CartItem[] = [
    { ...sampleMenu[0], quantity: 2 },
    { ...sampleMenu[1], quantity: 1 },
  ];
  const summary = calculateCartSummary(cart);
  assert.equal(summary.totalCount, 3);
  assert.equal(summary.hasAllRealPrices, false);
  assert.equal(summary.numericTotal, null);
});

test('calculateCartSummary computes numeric total when real prices exist', () => {
  const cart: CartItem[] = [
    { ...sampleMenu[0], price: 'Rs. 1,800', numericPrice: 1800, quantity: 2 },
    { ...sampleMenu[1], price: 'Rs. 1,100', numericPrice: 1100, quantity: 1 },
  ];
  const summary = calculateCartSummary(cart);
  assert.equal(summary.totalCount, 3);
  assert.equal(summary.hasAllRealPrices, true);
  assert.equal(summary.numericTotal, 4700);
});

test('buildWhatsAppOrderMessage supports Dine-in, Pickup, and Delivery', () => {
  const cart: CartItem[] = [
    { ...sampleMenu[0], quantity: 2 },
    { ...sampleMenu[1], quantity: 1 },
  ];

  const deliveryMsg = buildWhatsAppOrderMessage(cart, {
    customerName: 'Bilal Jadoon',
    orderType: 'Delivery',
    deliveryAddress: 'Jadoon Plaza Phase 2, Mandian, Abbottabad',
  });
  assert.ok(deliveryMsg.includes('- 2x Moroccan Steak (Rs. ---)'));
  assert.ok(deliveryMsg.includes('- 1x Creamy Alfredo Pasta (Rs. ---)'));
  assert.ok(deliveryMsg.includes('Order Type: Delivery'));
  assert.ok(deliveryMsg.includes('Delivery Address: Jadoon Plaza Phase 2, Mandian, Abbottabad'));

  const dineInUrl = buildWhatsAppOrderUrl('923139755550', cart, {
    customerName: 'Usman',
    orderType: 'Dine-in',
  });
  assert.ok(dineInUrl.startsWith('https://wa.me/923139755550?text='));
  assert.ok(decodeURIComponent(dineInUrl).includes('Order Type: Dine-in'));
});

test('buildBirthdayBookingMessage includes all booking fields', () => {
  const msg = buildBirthdayBookingMessage({
    name: 'Ayesha Khan',
    phone: '0313-9755550',
    date: '2026-11-20',
    time: '19:30',
    guests: 15,
    notes: 'Family birthday celebration',
  });
  assert.ok(msg.includes('Name: Ayesha Khan'));
  assert.ok(msg.includes('Number of Guests: 15'));
  assert.ok(msg.includes('Event Notes: Family birthday celebration'));
});
