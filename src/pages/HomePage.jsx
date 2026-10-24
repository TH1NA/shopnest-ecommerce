import { ArrowDown, ArrowRight, Flower2, PackageCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const collections = [
  { name: 'Home, made softer', category: 'Home', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=86', note: 'Little comforts, lasting pieces' },
  { name: 'Out and about', category: 'Wear', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1100&q=86', note: 'Everyday things to take along' },
  { name: 'Paper & pause', category: 'Paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1100&q=86', note: 'For thoughts worth keeping' },
];

export function HomePage() {
  const { products, catalogState } = useShop();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={13} /> A LITTLE SHOP FOR EVERYDAY</p>
          <h1>Make room<br />for <em>lovely.</em></h1>
          <p className="hero-description">Thoughtful pieces for your home, your routines, and the people you love. Picked slowly, meant to be lived with.</p>
          <Link className="primary-button" to="/shop">Explore the collection <ArrowRight size={17} /></Link>
          <div className="hero-footnote"><span className="footnote-line" /> GOOD THINGS, GENTLY GATHERED</div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=88" alt="Sunlit living room with carefully chosen home pieces" fetchPriority="high" />
          <div className="hero-sticker"><span>little things</span><strong>✳</strong><span>big feeling</span></div>
          <div className="image-caption">A slower kind<br />of lovely.</div>
          <a className="hero-scroll" href="#collection" aria-label="Scroll to the collection"><ArrowDown size={17} /></a>
        </div>
      </section>
      <section className="value-strip" aria-label="ShopNest promises">
        <div><PackageCheck /><p><strong>Picked with care</strong><span>Good things, not more things</span></p></div>
        <div><Flower2 /><p><strong>Made for everyday</strong><span>Useful, lovely, lived-in</span></p></div>
        <div><Sparkles /><p><strong>A little extra joy</strong><span>Free shipping over ₹3,000</span></p></div>
      </section>
      <section className="home-collection section-pad" id="collection">
        <div className="section-heading"><div><p className="eyebrow">A FEW GOOD THINGS</p><h2>Find your kind<br /><em>of everyday.</em></h2></div><Link className="text-link" to="/shop">See everything <ArrowRight size={16} /></Link></div>
        {catalogState.error && <p className="api-note" role="status">{catalogState.error}</p>}
        <div className="product-grid">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      </section>
      <section className="category-section">
        <div className="category-heading"><p className="eyebrow">A GOOD PLACE TO START</p><h2>Shop by feeling.</h2></div>
        <div className="category-grid">{collections.map((collection, index) => <Link className="category-tile" to={`/shop?category=${collection.category}`} key={collection.name} style={{ '--tile-order': index }}><img src={collection.image} alt="" loading="lazy" /><span className="category-index">0{index + 1}</span><span className="category-copy"><small>{collection.note}</small><strong>{collection.name}</strong></span><ArrowRight className="category-arrow" size={20} /></Link>)}</div>
      </section>
      <section className="story-band"><div className="story-image"><img src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=86" alt="A warm, personal corner of a thoughtfully furnished home" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">OUR WAY OF LOOKING</p><h2>Not more.<br /><em>Just right.</em></h2><p>We believe the things around us should earn their place: a cup you reach for, a lamp you leave on, a bag that goes everywhere.</p><Link className="text-link" to="/shop">Find your just-right thing <ArrowRight size={16} /></Link></div></section>
    </>
  );
}