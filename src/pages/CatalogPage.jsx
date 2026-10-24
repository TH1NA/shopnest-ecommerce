import { useMemo } from 'react';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export function CatalogPage({ favoritesOnly = false }) {
  const { products, favorites, catalogState } = useShop();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All things';
  const query = params.get('q') || '';
  const sort = params.get('sort') || 'featured';
  const categories = ['All things', ...new Set(products.map((product) => product.category))];
  const shownProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'All things' || product.category.toLowerCase() === category.toLowerCase();
      const matchesQuery = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase());
      const matchesFavorite = !favoritesOnly || favorites.includes(String(product.id));
      return matchesCategory && matchesQuery && matchesFavorite;
    });
    if (sort === 'price-low') return filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [products, favorites, favoritesOnly, category, query, sort]);

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value === 'All things' || !value) next.delete(key);
    else next.set(key, value);
    setParams(next);
  }

  return (
    <section className="catalog-page">
      <div className="catalog-intro"><p className="eyebrow">THE SHOPNEST EDIT</p><h1>{favoritesOnly ? 'Your saved things.' : 'Everyday, a little lovelier.'}</h1><p>{favoritesOnly ? 'The pieces you have your eye on, all in one place.' : 'Useful things, lovely things, and the small details that make a day feel yours.'}</p></div>
      <div className="catalog-controls"><div className="category-tabs" aria-label="Filter by category"><SlidersHorizontal size={15} />{!favoritesOnly && categories.map((name) => <button type="button" key={name} className={category === name ? 'active' : ''} onClick={() => updateParam('category', name)}>{name}</button>)}</div><label className="sort-select"><ArrowDownUp size={14} /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => updateParam('sort', event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
      {query && <p className="search-result-label">Showing results for <strong>“{query}”</strong></p>}
      {catalogState.error && <p className="api-note" role="status">{catalogState.error}</p>}
      {catalogState.loading && <p className="loading-note" role="status">Finding the good things…</p>}
      {shownProducts.length ? <div className="product-grid">{shownProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-state"><span>✳</span><h2>Nothing here just yet.</h2><p>{favoritesOnly ? 'Save a few favorites while you browse.' : 'Try another search or explore the whole collection.'}</p><button className="text-link" type="button" onClick={() => setParams({})}>Browse all things</button></div>}
    </section>
  );
}