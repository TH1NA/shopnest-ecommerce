import { useRef, useState } from 'react';
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export function SiteLayout() {
  const { cartCount, favorites } = useShop();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef(null);
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <div className="announcement">A little extra joy: free shipping over ₹3,000 <span aria-hidden="true">✳</span></div>
      <header className="site-header">
        <button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Link className="brand" to="/" aria-label="ShopNest home"><span className="brand-mark">s</span>shopnest<span className="brand-dot">.</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/shop">Shop all</NavLink><NavLink to="/shop?category=Home">Home</NavLink><NavLink to="/shop?category=Wear">Wear</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" type="button" aria-label={searchOpen ? 'Close search' : 'Open search'} aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); if (!searchOpen) requestAnimationFrame(() => searchInput.current?.focus()); }}><Search /></button>
          <form className={`header-search${searchOpen ? ' is-open' : ''}`} onSubmit={search} role="search">
            <Search size={16} aria-hidden="true" />
            <input ref={searchInput} aria-label="Search products" placeholder="Find your thing" value={query} onChange={(event) => setQuery(event.target.value)} />
          </form>
          <Link className="icon-button favorite-link" to="/favorites" aria-label={`Favorites, ${favorites.length} saved`}><Heart /><span className="action-count">{favorites.length}</span></Link>
          <Link className="bag-button" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={17} /><span>Bag</span><span className="bag-count">{cartCount}</span></Link>
        </div>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><Link onClick={() => setMenuOpen(false)} to="/shop">Shop all</Link><Link onClick={() => setMenuOpen(false)} to="/shop?category=Home">Home</Link><Link onClick={() => setMenuOpen(false)} to="/shop?category=Wear">Wear</Link><Link onClick={() => setMenuOpen(false)} to="/favorites">Saved things</Link></nav>}
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><Link className="brand" to="/"><span className="brand-mark">s</span>shopnest<span className="brand-dot">.</span></Link><p>Useful, lovely things for the everyday. Picked with care, packed with a little joy.</p></div>
          <div className="footer-links"><strong>Find your way</strong><Link to="/shop">The collection</Link><Link to="/favorites">Your saved things</Link><Link to="/cart">Your bag</Link></div>
          <div className="footer-note"><strong>A note from us</strong><p>Small things can make an ordinary day feel like yours.</p><Link to="/shop">Go find yours <ArrowRight size={14} /></Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 ShopNest</span><span>Thoughtful finds, everyday prices.</span><span>Made for slower mornings.</span></div>
      </footer>
    </>
  );
}