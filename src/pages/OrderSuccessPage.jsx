import { ArrowRight, Check } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export function OrderSuccessPage() {
  const { lastOrder } = useShop();
  if (!lastOrder) return <Navigate to="/shop" replace />;
  return <section className="success-page"><div className="success-mark"><Check size={32} /></div><p className="eyebrow">A LITTLE SOMETHING TO LOOK FORWARD TO</p><h1>It's in the bag.<br /><em>And on its way.</em></h1><p className="success-copy">Thanks for finding your thing with us. Your demo order has been placed.</p><div className="order-reference"><span>Order reference</span><strong>{lastOrder.id ?? lastOrder.orderId ?? 'ShopNest demo order'}</strong></div><p className="demo-note">This is a demo storefront. No payment was processed.</p><Link className="primary-button" to="/shop">Back to the shop <ArrowRight size={16} /></Link></section>;
}