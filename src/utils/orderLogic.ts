export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  numericPrice: number | null;
  popular: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderType = 'Dine-in' | 'Pickup' | 'Delivery';

export interface OrderDetails {
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  deliveryAddress?: string;
  notes?: string;
}

export interface BirthdayBookingDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string | number;
  notes?: string;
}

export function filterMenuItems(
  items: MenuItem[],
  activeCategory: string,
  searchQuery: string
): MenuItem[] {
  const trimmedSearch = searchQuery.trim().toLowerCase();
  if (trimmedSearch.length > 0) {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(trimmedSearch) ||
        item.description.toLowerCase().includes(trimmedSearch) ||
        item.category.toLowerCase().includes(trimmedSearch)
    );
  }
  if (activeCategory === 'All') {
    return items;
  }
  if (activeCategory === 'Popular') {
    return items.filter((item) => item.popular);
  }
  return items.filter((item) => item.category === activeCategory);
}

export function calculateCartSummary(cartItems: CartItem[]): {
  totalCount: number;
  hasAllRealPrices: boolean;
  numericTotal: number | null;
} {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasAllRealPrices =
    cartItems.length > 0 &&
    cartItems.every(
      (item) => typeof item.numericPrice === 'number' && item.numericPrice > 0
    );

  const numericTotal = hasAllRealPrices
    ? cartItems.reduce(
        (sum, item) => sum + (item.numericPrice ?? 0) * item.quantity,
        0
      )
    : null;

  return {
    totalCount,
    hasAllRealPrices,
    numericTotal,
  };
}

export function buildWhatsAppOrderMessage(
  cartItems: CartItem[],
  details: OrderDetails
): string {
  const lines: string[] = [
    'Hello Urban Cafe & Restaurant,',
    'I would like to place an order from your website:',
    '',
    'ORDER ITEMS:',
  ];

  for (const item of cartItems) {
    lines.push(`- ${item.quantity}x ${item.name} (${item.price})`);
  }

  const summary = calculateCartSummary(cartItems);
  lines.push('');
  if (summary.hasAllRealPrices && summary.numericTotal !== null) {
    lines.push(`Estimated Total: Rs. ${summary.numericTotal.toLocaleString('en-PK')}`);
  } else {
    lines.push('Total: To be confirmed by restaurant (menu prices pending confirmation)');
  }

  lines.push('');
  lines.push('CUSTOMER DETAILS:');
  lines.push(`Name: ${details.customerName.trim()}`);
  if (details.customerPhone && details.customerPhone.trim()) {
    lines.push(`Phone: ${details.customerPhone.trim()}`);
  }
  lines.push(`Order Type: ${details.orderType}`);
  if (details.orderType === 'Delivery' && details.deliveryAddress) {
    lines.push(`Delivery Address: ${details.deliveryAddress.trim()}`);
  }
  if (details.notes && details.notes.trim()) {
    lines.push(`Notes: ${details.notes.trim()}`);
  }
  lines.push('');
  lines.push('Please confirm availability and total bill. Thank you.');

  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(
  whatsappNumber: string,
  cartItems: CartItem[],
  details: OrderDetails
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = buildWhatsAppOrderMessage(cartItems, details);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildBirthdayBookingMessage(
  booking: BirthdayBookingDetails
): string {
  const lines: string[] = [
    'Hello Urban Cafe & Restaurant,',
    'I would like to inquire about a Birthday / Event Booking:',
    '',
    'BOOKING DETAILS:',
    `Name: ${booking.name.trim()}`,
    `Phone: ${booking.phone.trim()}`,
    `Preferred Date: ${booking.date.trim()}`,
    `Preferred Time: ${booking.time.trim()}`,
    `Number of Guests: ${String(booking.guests).trim()}`,
  ];

  if (booking.notes && booking.notes.trim()) {
    lines.push(`Event Notes: ${booking.notes.trim()}`);
  }

  lines.push('');
  lines.push('Please share available packages and pricing. Thank you.');
  return lines.join('\n');
}
