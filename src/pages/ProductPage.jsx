import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function ProductPage() {
  const { productId } = useParams();
  const { products, addToCart, favorites, toggleFavorite } = useShop();
  const product = products.find((item) => String(item.id) === productId);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) return <div className="empty-state product-not-found"><span>✳</span><h1>We couldn't find that one.</h1><Link className="text-link" to="/shop">Back to the collection</Link></div>;
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  const isFavorite = favorites.includes(String(product.id));

  function addProduct() {
    for (let count = 0; count < quantity; count += 1) addToCart(product);
    navigate('/cart');
  }

  return <>
    <section className="product-detail">
      <Link className="back-link" to="/shop"><ArrowLeft size={15} /> Back to the shop</Link>
      <div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><p className="eyebrow">{product.category}{product.color ? ` · ${product.color}` : ''}</p><h1>{product.name}</h1><div className="detail-rating"><Star size={15} fill="currentColor" /> {product.rating ? `${product.rating.toFixed(1)} · ${product.reviews} customer notes` : 'A ShopNest favorite'}</div><strong className="detail-price">{formatPrice(product.price)}</strong><p className="detail-description">{product.description}</p><div className="detail-perks"><span>✳ Thoughtfully picked</span><span>↗ Free shipping over ₹3,000</span></div><div className="detail-actions"><div className="quantity-control"><button type="button" aria-label="Remove one" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button type="button" aria-label="Add one" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div><button className="primary-button" type="button" onClick={addProduct}><ShoppingBag size={16} /> Add to bag</button><button className={`detail-heart${isFavorite ? ' is-liked' : ''}`} type="button" aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'} aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} /></button></div><p className="demo-note">Demo storefront. No payment is collected.</p></div></div>
    </section>
    {related.length > 0 && <section className="related-section section-pad"><div className="section-heading"><div><p className="eyebrow">GOOD COMPANY</p><h2>Goes nicely with.</h2></div></div><div className="product-grid">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div></section>}
  </>;
}