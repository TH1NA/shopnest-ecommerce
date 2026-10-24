import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createOrder, getProducts } from '../api/shopApi';
import { starterProducts } from '../data/products';

const ShopContext = createContext(null);
const CART_KEY = 'shopnest-cart-v1';
const FAVORITES_KEY = 'shopnest-favorites-v1';

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(starterProducts);
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [favorites, setFavorites] = useState(() => readStorage(FAVORITES_KEY, []));
  const [catalogState, setCatalogState] = useState({ loading: Boolean(import.meta.env.VITE_API_BASE_URL), error: '' });
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((records) => {
        if (active) setProducts(records);
      })
      .catch(() => {
        if (active) setCatalogState({ loading: false, error: 'Showing the ShopNest sample collection while the catalog API is unavailable.' });
      })
      .finally(() => {
        if (active) setCatalogState((current) => ({ ...current, loading: false }));
      });
    return () => { active = false; };
  }, []);

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)), [favorites]);

  const addToCart = (product) => setCart((current) => {
    const found = current.find((line) => line.productId === String(product.id));
    if (found) return current.map((line) => line === found ? { ...line, quantity: line.quantity + 1 } : line);
    return [...current, { productId: String(product.id), product, quantity: 1 }];
  });

  const setQuantity = (productId, quantity) => setCart((current) => quantity < 1
    ? current.filter((line) => line.productId !== String(productId))
    : current.map((line) => line.productId === String(productId) ? { ...line, quantity } : line));

  const removeFromCart = (productId) => setCart((current) => current.filter((line) => line.productId !== String(productId)));
  const clearCart = () => setCart([]);
  const toggleFavorite = (productId) => setFavorites((current) => current.includes(String(productId))
    ? current.filter((id) => id !== String(productId))
    : [...current, String(productId)]);

  const submitOrder = async (customer) => {
    const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 99;
    const order = await createOrder({
      customer,
      items: cart.map((line) => ({ productId: line.productId, name: line.product.name, price: line.product.price, quantity: line.quantity })),
      subtotal,
      shipping,
      total: subtotal + shipping,
    });
    setLastOrder(order);
    clearCart();
    return order;
  };

  const value = useMemo(() => ({
    products, catalogState, cart, favorites, lastOrder,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    addToCart, setQuantity, removeFromCart, clearCart, toggleFavorite, submitOrder,
  }), [products, catalogState, cart, favorites, lastOrder]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider.');
  return context;
}