import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck, Truck, RotateCcw, Headphones, Tag, Star } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';

export default function Home() {
  const { products, addToast } = useContext(ShopContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Categories list with custom Unsplash images
  const categories = [
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80' },
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80' },
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80' },
    { name: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=80' },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=80' },
    { name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80' },
    { name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80' },
    { name: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80' },
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80' },
    { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=500&auto=format&fit=crop&q=80' },
  ];

  // Brands list
  const brands = [
    "Nike", "Adidas", "Puma", "Levi's", "Tommy Hilfiger",
    "Calvin Klein", "Jack & Jones", "U.S. Polo Assn.", "Van Heusen", "Allen Solly"
  ];

  // Testimonials
  const reviews = [
    {
      id: 1,
      name: 'Aditya Sen',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'UrbanThreads has completely transformed my wardrobe. The leather jacket I ordered fits perfectly and is of exceptionally premium quality. The delivery was super quick!',
    },
    {
      id: 2,
      name: 'Manish Sharma',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'I bought two Oxford shirts and they look extremely elegant. Standard fit, smooth fabric, and great customer support when I wanted to change color options. Will buy again!',
    },
    {
      id: 3,
      name: 'Rohit Verma',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 4,
      text: 'The gold-accent chronograph watch is gorgeous. The weight is perfect and packaging felt like opening a luxury item. Shipping was free above ₹999 which is great.',
    }
  ];

  // Slide arrivals container
  const slide = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      addToast('Thank you for subscribing to UrbanThreads Newsletter!', 'success');
      setEmailInput('');
    }
  };

  return (
    <div style={styles.home} className="fade-in">
      {/* 1. HERO SECTION */}
      <section style={styles.hero} className="fade-in">
        <div style={styles.heroOverlay} />
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroContent} className="slide-up">
            <span style={styles.heroTag}>SEASON REVEAL</span>
            <h1 style={styles.heroTitle}>Upgrade Your Style</h1>
            <p style={styles.heroSubtitle}>
              Premium Men's Fashion for Every Occasion. Tailored for comfort, styled for luxury.
            </p>
            <div style={styles.heroButtons}>
              <button
                onClick={() => navigate('/shop')}
                className="btn btn-gold"
                style={styles.heroBtn}
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/shop?tag=new')}
                className="btn btn-secondary"
                style={{ ...styles.heroBtn, color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFERS SECTION (Banners) */}
      <section className="container" style={{ ...styles.offersSection, paddingBottom: '30px' }}>
        <div style={styles.offersGrid}>
          {/* Offer Card 1 */}
          <div style={{ ...styles.offerCard, backgroundColor: 'var(--bg-secondary)' }}>
            <div style={styles.offerLeft}>
              <span style={styles.offerTag}>MEGA SALE</span>
              <h3 style={styles.offerTitle}>Flat 50% OFF</h3>
              <p style={styles.offerDesc}>On select leather jackets & blazers</p>
              <button onClick={() => navigate('/shop?sale=true')} style={styles.offerBtn} className="btn-text">
                Shop Sale
              </button>
            </div>
            <Tag size={60} style={styles.offerIcon} />
          </div>

          {/* Offer Card 2 */}
          <div style={{ ...styles.offerCard, backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
            <div style={styles.offerLeft}>
              <span style={{ ...styles.offerTag, color: 'var(--accent-gold)' }}>EXCLUSIVE OFFER</span>
              <h3 style={{ ...styles.offerTitle, color: 'var(--bg-primary)' }}>Buy 2 Get 1 Free</h3>
              <p style={{ ...styles.offerDesc, color: 'var(--text-secondary)' }}>Premium Tees & Casual Shirts</p>
              <button
                onClick={() => navigate('/shop?category=Shirts')}
                style={{ ...styles.offerBtn, color: 'var(--accent-gold)', borderBottomColor: 'var(--accent-gold)' }}
                className="btn-text"
              >
                Claim Offer
              </button>
            </div>
            <Tag size={60} style={{ ...styles.offerIcon, color: 'var(--accent-gold)' }} />
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section style={styles.greySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Browse Collections</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>

          <div style={styles.categoriesGrid} className="grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                style={styles.categoryCard}
                className="category-hover"
              >
                <div style={styles.catImageWrapper}>
                  <img src={cat.image} alt={cat.name} style={styles.catImage} />
                </div>
                <div style={styles.catOverlay} />
                <div style={styles.catInfo}>
                  <span style={styles.catName}>{cat.name}</span>
                  <button style={styles.catBtn}>Shop Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING COLLECTION */}
      <section className="container">
        <div className="section-header">
          <span className="section-subtitle">Most Wanted</span>
          <h2 className="section-title">Trending Collection</h2>
        </div>

        <div className="grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
        
        <div style={styles.centerBtnRow}>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
            View All Products
          </button>
        </div>
      </section>

      {/* 5. NEW ARRIVALS HORIZONTAL SLIDER */}
      <section style={styles.greySection}>
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-header">
            <span className="section-subtitle">Fresh Drop</span>
            <h2 className="section-title">New Arrivals</h2>
          </div>

          {/* Slider controls */}
          <div style={styles.sliderControls}>
            <button onClick={() => slide('left')} style={styles.sliderArrow} aria-label="Slide Left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => slide('right')} style={styles.sliderArrow} aria-label="Slide Right">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Product list */}
          <div ref={sliderRef} style={styles.sliderContainer}>
            {products.slice(4, 10).map((product) => (
              <div key={product.id} style={styles.sliderItem}>
                <ProductCard
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="container">
        <div className="section-header">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">The UrbanThreads Difference</h2>
        </div>

        <div style={styles.featuresGrid} className="grid-cols-3">
          <div style={styles.featureCard}>
            <ShieldCheck size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Premium Quality</h3>
            <p style={styles.featureText}>
              We source only the finest fabrics and materials to craft garments that look stunning and last a lifetime.
            </p>
          </div>

          <div style={styles.featureCard}>
            <Truck size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Fast Delivery</h3>
            <p style={styles.featureText}>
              Enjoy express shipping on all orders, with same-day dispatch and live tracking updates.
            </p>
          </div>

          <div style={styles.featureCard}>
            <RotateCcw size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Easy Returns</h3>
            <p style={styles.featureText}>
              Not the right fit? Exchange or return items easily within 15 days with our hassle-free reverse pickup.
            </p>
          </div>

          <div style={styles.featureCard}>
            <Headphones size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>24/7 Support</h3>
            <p style={styles.featureText}>
              Our styling advisors and support associates are available round-the-clock via chat or telephone.
            </p>
          </div>

          <div style={styles.featureCard}>
            <CheckCircle size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Genuine Brands</h3>
            <p style={styles.featureText}>
              Every item is certified authentic and sourced directly from international labels.
            </p>
          </div>

          <div style={styles.featureCard}>
            <Tag size={32} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Secure Payments</h3>
            <p style={styles.featureText}>
              Your security is paramount. We support fully encrypted payments via Card, NetBanking, and UPI.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FEATURED BRANDS */}
      <section style={styles.greySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Luxury Partnerships</span>
            <h2 className="section-title">Featured Brands</h2>
          </div>

          <div style={styles.brandsGrid}>
            {brands.map((brand) => (
              <div
                key={brand}
                onClick={() => navigate(`/shop?brand=${encodeURIComponent(brand)}`)}
                style={styles.brandCard}
                className="brand-hover"
              >
                <span style={styles.brandText}>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="container">
        <div className="section-header">
          <span className="section-subtitle">Client Feedback</span>
          <h2 className="section-title">Customer Reviews</h2>
        </div>

        <div className="grid-cols-3">
          {reviews.map((rev) => (
            <div key={rev.id} style={styles.revCard} className="glass-panel">
              <div style={styles.revTop}>
                <img src={rev.image} alt={rev.name} style={styles.revUserImage} />
                <div>
                  <h4 style={styles.revName}>{rev.name}</h4>
                  <span style={styles.revBadge}>Verified Buyer</span>
                </div>
              </div>
              <div style={styles.stars} style={{ margin: '12px 0' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < rev.rating ? 'var(--accent-gold)' : 'none'}
                    color="var(--accent-gold)"
                  />
                ))}
              </div>
              <p style={styles.revText}>"{rev.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section style={styles.newsletterSection}>
        <div style={styles.newsletterOverlay} />
        <div className="container" style={styles.newsContainer}>
          <div style={styles.newsContent}>
            <h2 style={styles.newsTitle}>Subscribe To The Club</h2>
            <p style={styles.newsDesc}>
              Unlock access to exclusive sales, digital style lookbooks, and 15% off your next luxury order.
            </p>
            <form onSubmit={handleSubscribe} style={styles.newsForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={styles.newsInput}
                required
              />
              <button type="submit" style={styles.newsSubmit} className="btn btn-gold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

const styles = {
  home: {
    width: '100%',
  },
  hero: {
    height: 'calc(100vh - var(--header-height))',
    minHeight: '600px',
    backgroundImage: `url('https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=1600&auto=format&fit=crop&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(17,17,17,0.7) 40%, rgba(17,17,17,0.2) 100%)',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 2,
  },
  heroContent: {
    maxWidth: '600px',
    color: '#FFFFFF',
  },
  heroTag: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent-gold)',
    marginBottom: '16px',
    display: 'block',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    lineHeight: '1.1',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '1rem',
    opacity: 0.9,
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
  },
  heroBtn: {
    height: '50px',
    padding: '0 32px',
  },
  greySection: {
    backgroundColor: 'var(--bg-secondary)',
    transition: 'background-color var(--transition-smooth)',
  },
  offersSection: {
    marginTop: '-50px',
    position: 'relative',
    zIndex: 5,
  },
  offersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  offerCard: {
    padding: '36px 40px',
    borderRadius: 'var(--border-radius-sm)',
    boxShadow: 'var(--shadow-medium)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  offerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'flex-start',
  },
  offerTag: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--text-muted)',
  },
  offerTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  offerDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '12px',
  },
  offerBtn: {
    marginTop: '6px',
  },
  offerIcon: {
    color: 'var(--border-color)',
    opacity: 0.8,
  },
  categoriesGrid: {
    width: '100%',
  },
  categoryCard: {
    height: '240px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'var(--border-radius-sm)',
    cursor: 'pointer',
    border: '1px solid var(--border-color)',
  },
  catImageWrapper: {
    width: '100%',
    height: '100%',
  },
  catImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-premium)',
  },
  catOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(17,17,17,0.85) 15%, rgba(17,17,17,0.1) 80%)',
    transition: 'opacity var(--transition-smooth)',
  },
  catInfo: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#FFFFFF',
    zIndex: 2,
  },
  catName: {
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  catBtn: {
    alignSelf: 'flex-start',
    fontSize: '0.65rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--accent-gold)',
    borderBottom: '1px solid var(--accent-gold)',
    paddingBottom: '2px',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all var(--transition-smooth)',
  },
  centerBtnRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  sliderControls: {
    position: 'absolute',
    top: '30px',
    right: '24px',
    display: 'flex',
    gap: '8px',
  },
  sliderArrow: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-subtle)',
    transition: 'background-color 0.2s, color 0.2s',
  },
  sliderContainer: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: '20px',
    scrollBehavior: 'smooth',
  },
  sliderItem: {
    flexShrink: 0,
    width: 'calc(25% - 18px)', // 4 items per page on desktop
    scrollSnapAlign: 'start',
  },
  featuresGrid: {
    width: '100%',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '24px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'border-color 0.3s',
  },
  featureIcon: {
    color: 'var(--accent-gold)',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  featureText: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  brandsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
  },
  brandCard: {
    height: '80px',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s, transform 0.2s',
  },
  brandText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
    textAlign: 'center',
  },
  revCard: {
    padding: '30px',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
  },
  revTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  revUserImage: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  revName: {
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  revBadge: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-success)',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  revText: {
    fontSize: '0.825rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
    lineHeight: '1.5',
  },
  newsletterSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    backgroundImage: `url('https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1600&auto=format&fit=crop&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsletterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(17,17,17,0.85)',
  },
  newsContainer: {
    position: 'relative',
    zIndex: 2,
  },
  newsContent: {
    maxWidth: '560px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  newsTitle: {
    fontSize: '2.25rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  newsDesc: {
    fontSize: '0.9rem',
    opacity: 0.8,
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  newsForm: {
    display: 'flex',
    width: '100%',
    border: '1px solid var(--accent-gold)',
    padding: '4px',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  newsInput: {
    flexGrow: 1,
    padding: '12px 16px',
    fontSize: '0.9rem',
    color: '#FFFFFF',
  },
  newsSubmit: {
    padding: '0 28px',
  },
};

// Embedded styles
const css = `
.category-hover:hover img {
  transform: scale(1.08);
}
.category-hover:hover button {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.category-hover:hover div[style*="catOverlay"] {
  opacity: 0.95;
}
.brand-hover:hover {
  border-color: var(--text-primary) !important;
  transform: translateY(-2px);
}
.brand-hover:hover span {
  color: var(--text-primary) !important;
}
button[style*="sliderArrow"]:hover {
  background-color: var(--text-primary) !important;
  color: var(--bg-primary) !important;
}
@media (max-width: 992px) {
  div[style*="sliderItem"] {
    width: calc(33.333% - 16px) !important;
  }
}
@media (max-width: 768px) {
  div[style*="hero"] {
    height: 480px !important;
    min-height: auto !important;
  }
  h1[style*="heroTitle"] {
    font-size: 2.25rem !important;
  }
  div[style*="offersGrid"] {
    grid-template-columns: 1fr !important;
    margin-top: 0 !important;
  }
  div[style*="sliderItem"] {
    width: calc(50% - 12px) !important;
  }
  div[style*="brandsGrid"] {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
@media (max-width: 480px) {
  div[style*="sliderItem"] {
    width: 100% !important;
  }
  div[style*="brandsGrid"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
