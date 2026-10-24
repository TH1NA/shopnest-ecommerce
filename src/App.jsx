import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return <Routes><Route element={<SiteLayout />}><Route index element={<HomePage />} /><Route path="shop" element={<CatalogPage />} /><Route path="favorites" element={<CatalogPage favoritesOnly />} /><Route path="product/:productId" element={<ProductPage />} /><Route path="cart" element={<CartPage />} /><Route path="checkout" element={<CheckoutPage />} /><Route path="order-success" element={<OrderSuccessPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}