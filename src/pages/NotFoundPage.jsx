import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow">A LITTLE DETOUR</p><h1>Nothing here<br /><em>just yet.</em></h1><p>We couldn't find that page. Let's get you back to the good things.</p><Link className="primary-button" to="/"><ArrowLeft size={16} /> Back to ShopNest</Link></section>;
}