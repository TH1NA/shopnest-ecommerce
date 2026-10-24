import { useState } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export function CheckoutPage() {
  const { cart, subtotal, submitOrder } = useShop();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 99;
  if (!cart.length) return <Navigate to="/cart" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const customer = Object.fromEntries(form.entries());
    try {
      await submitOrder(customer);
      navigate('/order-success');
    } catch (submitError) {
      setError(`We couldn't place the order. ${submitError.message} Please try again.`);
    } finally {
      setBusy(false);
    }
  }

  return <section className="checkout-page"><Link className="back-link" to="/cart"><ArrowLeft size={15} /> Back to your bag</Link><div className="page-heading"><p className="eyebrow">ALMOST YOURS</p><h1>Make it yours<span className="heading-period">.</span></h1></div><div className="checkout-layout"><form className="checkout-form" onSubmit={handleSubmit}><div className="form-section-heading"><span>01</span><div><h2>Where should we send it?</h2><p>Your details are only used for this demo order.</p></div></div><label>Full name<input name="name" autoComplete="name" required maxLength="100" /></label><div className="form-two-col"><label>Email address<input type="email" name="email" autoComplete="email" required /></label><label>Phone number<input type="tel" name="phone" autoComplete="tel" required /></label></div><label>Street address<input name="address" autoComplete="street-address" required maxLength="200" /></label><div className="form-two-col"><label>City<input name="city" autoComplete="address-level2" required /></label><label>PIN code<input name="postalCode" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" required /></label></div><div className="checkout-disclaimer"><LockKeyhole size={15} /><span>Demo checkout only. No payment information is requested or collected.</span></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button checkout-submit" type="submit" disabled={busy}>{busy ? 'Placing your order…' : 'Place demo order'} <ArrowRight size={16} /></button></form>
      <aside className="checkout-summary"><p className="eyebrow">YOUR GOOD THINGS</p><h2>Order summary</h2>{cart.map((line) => <div className="checkout-item" key={line.productId}><img src={line.product.image} alt="" /><div><strong>{line.product.name}</strong><span>Qty {line.quantity}</span></div><span>{formatPrice(line.product.price * line.quantity)}</span></div>)}<div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="summary-row"><span>Delivery</span><span>{shipping ? formatPrice(shipping) : 'On us'}</span></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div></aside></div></section>;
}