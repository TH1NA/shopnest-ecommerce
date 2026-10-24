import { starterProducts } from '../data/products';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
const productsPath = import.meta.env.VITE_API_PRODUCTS_PATH || '/api/products';
const ordersPath = import.meta.env.VITE_API_ORDERS_PATH || '/api/orders';

function apiUrl(path) {
  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

async function request(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}

function normalizeProduct(product, index) {
  return {
    id: String(product.id ?? product._id ?? `product-${index}`),
    name: product.name ?? product.title ?? 'Untitled product',
    category: product.category?.name ?? product.category ?? 'Everyday',
    color: product.color ?? product.variant ?? '',
    price: Number(product.price ?? product.salePrice ?? 0),
    rating: Number(product.rating ?? 0),
    reviews: Number(product.reviews ?? product.reviewCount ?? 0),
    badge: product.badge ?? '',
    description: product.description ?? '',
    image: product.image ?? product.imageUrl ?? product.images?.[0] ?? starterProducts[index % starterProducts.length].image,
  };
}

export async function getProducts() {
  if (!apiBaseUrl) return starterProducts;
  const result = await request(productsPath);
  const records = Array.isArray(result) ? result : result?.products;
  if (!Array.isArray(records)) throw new Error('The products endpoint did not return a product list.');
  return records.map(normalizeProduct);
}

export async function createOrder(order) {
  if (!apiBaseUrl) {
    return { id: `SN-${Date.now().toString().slice(-8)}`, ...order, demo: true };
  }
  return request(ordersPath, { method: 'POST', body: JSON.stringify(order) });
}