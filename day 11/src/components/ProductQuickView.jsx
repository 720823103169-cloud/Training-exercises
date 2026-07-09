import React, { useContext, useState } from 'react';
import { X, ShoppingBag, Star, Heart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function ProductQuickView({ product, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div style={styles.overlay} className="fade-in" onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        className="slide-up glass-panel"
      >
        <button onClick={onClose} style={styles.closeBtn} aria-label="Close modal">
          <X size={22} />
        </button>

        <div style={styles.container}>
          {/* Left: Product Images */}
          <div style={styles.imageCol}>
            <img src={product.mainImage} alt={product.title} style={styles.image} />
          </div>

          {/* Right: Product Details */}
          <div style={styles.detailsCol}>
            <span style={styles.brand}>{product.brand}</span>
            <h2 style={styles.title}>{product.title}</h2>

            {/* Ratings Row */}
            <div style={styles.ratingRow}>
              <div style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'none'}
                    color="var(--accent-gold)"
                  />
                ))}
              </div>
              <span style={styles.ratingText}>
                {product.rating} ({product.ratingCount} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div style={styles.priceRow}>
              <span style={styles.discountedPrice}>₹{product.discountedPrice.toLocaleString()}</span>
              {product.originalPrice > product.discountedPrice && (
                <>
                  <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                  <span style={styles.discountPercent}>({product.discount}% OFF)</span>
                </>
              )}
            </div>

            <p style={styles.description}>{product.description}</p>

            {/* Options: Colors */}
            {product.colors && product.colors.length > 0 && (
              <div style={styles.optionGroup}>
                <h4 style={styles.optionLabel}>Select Color: {selectedColor}</h4>
                <div style={styles.colorWrapper}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.colorBubble,
                        borderColor: selectedColor === color ? 'var(--accent-gold)' : 'var(--border-color)',
                        backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' :
                                         color.toLowerCase() === 'black' ? '#111111' :
                                         color.toLowerCase() === 'gold' ? '#D4AF37' :
                                         color.toLowerCase() === 'charcoal' ? '#333333' :
                                         color.toLowerCase() === 'dark gray' ? '#555555' :
                                         color.toLowerCase() === 'light blue' ? '#ADD8E6' :
                                         color.toLowerCase() === 'navy blue' ? '#000080' :
                                         color.toLowerCase() === 'navy' ? '#000080' :
                                         color.toLowerCase() === 'olive green' ? '#556B2F' :
                                         color.toLowerCase() === 'tan brown' ? '#B87333' :
                                         color.toLowerCase() === 'royal blue' ? '#4169E1' :
                                         color.toLowerCase() === 'gold cream' ? '#F5F5DC' :
                                         '#888888',
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Options: Sizes */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
              <div style={styles.optionGroup}>
                <h4 style={styles.optionLabel}>Select Size: {selectedSize}</h4>
                <div style={styles.sizeWrapper}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        ...styles.sizeBtn,
                        borderColor: selectedSize === size ? 'var(--text-primary)' : 'var(--border-color)',
                        backgroundColor: selectedSize === size ? 'var(--text-primary)' : 'transparent',
                        color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-primary)',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={styles.actionRow}>
              <div style={styles.quantityContainer}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  -
                </button>
                <span style={styles.qtyVal}>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} style={styles.qtyBtn}>
                  +
                </button>
              </div>

              <button onClick={handleAddToCart} style={styles.addCartBtn} className="btn btn-primary">
                <ShoppingBag size={16} style={{ marginRight: '8px' }} />
                Add To Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  ...styles.wishlistBtn,
                  color: isWishlisted ? 'var(--color-error)' : 'var(--text-primary)',
                }}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'var(--color-error)' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    borderRadius: 'var(--border-radius-sm)',
    position: 'relative',
    overflowY: 'auto',
    backgroundColor: 'var(--bg-primary)',
    boxShadow: 'var(--shadow-premium)',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: 'var(--text-primary)',
    zIndex: 10,
    transition: 'transform 0.2s',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1.2fr',
  },
  imageCol: {
    width: '100%',
    backgroundColor: 'var(--bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: '550px',
    objectFit: 'cover',
  },
  detailsCol: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--accent-gold)',
    marginBottom: '8px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  stars: {
    display: 'flex',
    gap: '2px',
  },
  ratingText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-color)',
  },
  discountedPrice: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  originalPrice: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    textDecoration: 'line-through',
  },
  discountPercent: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
  },
  description: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  optionGroup: {
    marginBottom: '20px',
  },
  optionLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  colorWrapper: {
    display: 'flex',
    gap: '10px',
  },
  colorBubble: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    border: '2px solid transparent',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.15s, border-color 0.15s',
  },
  sizeWrapper: {
    display: 'flex',
    gap: '8px',
  },
  sizeBtn: {
    width: '40px',
    height: '40px',
    border: '1px solid var(--border-color)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '10px',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    height: '46px',
    borderRadius: 'var(--border-radius-sm)',
  },
  qtyBtn: {
    width: '36px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    transition: 'background-color 0.2s',
  },
  qtyVal: {
    padding: '0 12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    minWidth: '32px',
    textAlign: 'center',
  },
  addCartBtn: {
    flexGrow: 1,
    height: '46px',
    padding: '0 24px',
  },
  wishlistBtn: {
    width: '46px',
    height: '46px',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
};

// Embedded responsive media query css styles
const css = `
@media (max-width: 768px) {
  div[style*="grid-template-columns: 1.1fr 1.2fr"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="max-height: 550px"] {
    max-height: 350px !important;
  }
  div[style*="padding: 40px"] {
    padding: 24px !important;
  }
}
button[aria-label="Close modal"]:hover {
  transform: rotate(90deg);
}
div[style*="colorBubble"]:hover {
  transform: scale(1.1);
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
