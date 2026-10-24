import { ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export function ProductCard({ product, index = 0 }) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.includes(String(product.id));

  return (
    <article className="product-card" style={{ '--card-order': index }}>
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`heart-button${isFavorite ? ' is-liked' : ''}`} type="button" onClick={() => toggleFavorite(product.id)} aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`} aria-pressed={isFavorite}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
        <button className="quick-add" type="button" onClick={() => addToCart(product)}><ShoppingBag size={15} /> Add to bag</button>
      </div>
      <div className="product-info">
        <div><p className="product-meta">{product.category}{product.color ? ` · ${product.color}` : ''}</p><Link className="product-name" to={`/product/${product.id}`}>{product.name}<ArrowUpRight size={15} /></Link></div>
        <strong className="product-price">{formatPrice(product.price)}</strong>
      </div>
      <p className="rating">{product.rating ? `★ ${product.rating.toFixed(1)}  ·  ${product.reviews} notes` : 'Thoughtfully picked'}</p>
    </article>
  );
}