import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, GitCompare, Star } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist, compareList, toggleCompare } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card-lift"
    >
      {/* Product Image Wrapper */}
      <div style={styles.imageWrapper}>
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div style={styles.discountBadge}>-{product.discount}%</div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          style={{
            ...styles.wishlistBtn,
            color: isWishlisted ? 'var(--color-error)' : 'var(--text-muted)',
            backgroundColor: isWishlisted ? 'rgba(255,255,255,1)' : 'rgba(255, 255, 255, 0.8)',
          }}
          aria-label="Toggle Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'var(--color-error)' : 'none'} />
        </button>

        {/* Compare Button */}
        <button
          onClick={handleCompare}
          style={{
            ...styles.compareBtn,
            color: isCompared ? 'var(--accent-gold)' : 'var(--text-muted)',
            backgroundColor: isCompared ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.8)',
          }}
          aria-label="Toggle Compare"
        >
          <GitCompare size={14} />
        </button>

        {/* Primary and Hover Image */}
        <Link to={`/product/${product.id}`} style={styles.imageLink}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.mainImage}
            alt={product.title}
            style={{
              ...styles.image,
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </Link>

        {/* Quick View and Add to Cart Hover Actions */}
        <div
          style={{
            ...styles.hoverActions,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <button
            onClick={() => onQuickView(product)}
            style={styles.actionIconBtn}
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={handleAddToCart}
            style={styles.actionIconBtn}
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div style={styles.details}>
        <div style={styles.brandRow}>
          <span style={styles.brand}>{product.brand}</span>
          <div style={styles.rating}>
            <Star size={10} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span style={styles.ratingText}>{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 style={styles.title} title={product.title}>
            {product.title}
          </h3>
        </Link>

        <div style={styles.priceRow}>
          <span style={styles.discountedPrice}>₹{product.discountedPrice.toLocaleString()}</span>
          {product.originalPrice > product.discountedPrice && (
            <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
    transition: 'transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-fast)',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '125%', // 4:5 Aspect Ratio for premium look
    backgroundColor: 'var(--bg-secondary)',
    overflow: 'hidden',
  },
  imageLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-premium)',
  },
  discountBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '2px',
    zIndex: 3,
    letterSpacing: '0.05em',
  },
  wishlistBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-subtle)',
    zIndex: 3,
    transition: 'transform 0.2s, background-color 0.2s',
  },
  compareBtn: {
    position: 'absolute',
    top: '50px',
    right: '12px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-subtle)',
    zIndex: 3,
    transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
  },
  hoverActions: {
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3,
    transition: 'opacity var(--transition-smooth), transform var(--transition-smooth)',
  },
  actionIconBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-medium)',
    transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
  },
  details: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexGrow: 1,
  },
  brandRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  ratingText: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  title: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.4',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginTop: '2px',
  },
  discountedPrice: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  originalPrice: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textDecoration: 'line-through',
  },
};

// Embed style classes for global transitions
const css = `
.card-lift:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-medium);
  border-color: var(--text-primary);
}
:root.dark .card-lift:hover {
  border-color: var(--border-color);
}
.card-lift button:hover {
  transform: scale(1.1);
}
.card-lift div[style*="opacity"] button:hover {
  background-color: var(--text-primary) !important;
  color: var(--bg-primary) !important;
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
