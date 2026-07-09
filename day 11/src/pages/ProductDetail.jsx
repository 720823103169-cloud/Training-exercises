import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Check, ChevronRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, addRecentlyViewed } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [similarProductQuick, setSimilarProductQuick] = useState(null);

  // Sync state on product ID change
  useEffect(() => {
    const prodId = parseInt(id);
    const found = products.find((p) => p.id === prodId);
    if (found) {
      setProduct(found);
      setActiveImage(found.mainImage);
      // Create a gallery of 3 images
      setGalleryImages([
        found.mainImage,
        found.hoverImage || found.mainImage,
        // Add a generic fallback detailed view for third image
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
      ]);
      setSelectedSize(found.sizes[0] || '');
      setSelectedColor(found.colors[0] || '');
      setQuantity(1);
      setDeliveryStatus(null);
      setPincode('');
      // Track recently viewed
      addRecentlyViewed(found.id);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [id, products, navigate]);

  if (!product) return <div style={styles.loading}>Loading garment details...</div>;

  const isWishlisted = wishlist.includes(product.id);

  // Handle Zoom Move
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setDeliveryStatus({
        success: true,
        message: 'Delivery available. Expected delivery within 2-4 business days. COD available.',
      });
    } else {
      setDeliveryStatus({
        success: false,
        message: 'Please enter a valid 6-digit Indian delivery pincode (e.g. 560001).',
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  // Find similar products in the same category (excluding current product)
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={styles.detailPage} className="container fade-in">
      {/* Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <span onClick={() => navigate('/')} style={styles.breadLink}>Home</span>
        <ChevronRight size={12} style={styles.breadIcon} />
        <span onClick={() => navigate('/shop')} style={styles.breadLink}>Shop</span>
        <ChevronRight size={12} style={styles.breadIcon} />
        <span onClick={() => navigate(`/shop?category=${product.category}`)} style={styles.breadLink}>
          {product.category}
        </span>
        <ChevronRight size={12} style={styles.breadIcon} />
        <span style={styles.breadCurrent}>{product.title}</span>
      </div>

      {/* Main product box */}
      <div style={styles.mainLayout}>
        {/* Left: Gallery columns */}
        <div style={styles.galleryCol}>
          {/* Thumbnails row/column */}
          <div style={styles.thumbsWrapper}>
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                style={{
                  ...styles.thumbCard,
                  borderColor: activeImage === img ? 'var(--accent-gold)' : 'var(--border-color)',
                }}
              >
                <img src={img} alt={`View angle ${idx}`} style={styles.thumbImage} />
              </div>
            ))}
          </div>

          {/* Large Main Image with Magnifier Zoom */}
          <div
            style={styles.mainImageWrapper}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <img src={activeImage} alt={product.title} style={styles.mainImage} />
            {isZooming && (
              <div
                style={{
                  ...styles.zoomOverlay,
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            )}
          </div>
        </div>

        {/* Right: Info Column */}
        <div style={styles.infoCol}>
          <span style={styles.brand}>{product.brand}</span>
          <h1 style={styles.title}>{product.title}</h1>

          {/* Rating summary */}
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
              {product.rating} ({product.ratingCount} Customer Reviews)
            </span>
          </div>

          {/* Pricing block */}
          <div style={styles.priceContainer}>
            <div style={styles.priceRow}>
              <span style={styles.discountedPrice}>₹{product.discountedPrice.toLocaleString()}</span>
              {product.originalPrice > product.discountedPrice && (
                <>
                  <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                  <span style={styles.discountBadge}>
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p style={styles.taxLabel}>Inclusive of all taxes</p>
          </div>

          {/* Product Description brief */}
          <p style={styles.description}>{product.description}</p>

          {/* Select Color */}
          {product.colors && product.colors.length > 0 && (
            <div style={styles.optionSection}>
              <h4 style={styles.optionLabel}>Color: {selectedColor}</h4>
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

          {/* Select Size */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
            <div style={styles.optionSection}>
              <h4 style={styles.optionLabel}>Size: {selectedSize}</h4>
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

          {/* Quantity Selector & Action buttons */}
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

            <button onClick={handleAddToCart} style={styles.cartBtn} className="btn btn-primary">
              <ShoppingBag size={18} style={{ marginRight: '8px' }} />
              Add To Cart
            </button>

            <button onClick={handleBuyNow} style={styles.buyBtn} className="btn btn-gold">
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                ...styles.wishlistBtn,
                color: isWishlisted ? 'var(--color-error)' : 'var(--text-primary)',
              }}
              aria-label="Wishlist"
            >
              <Heart size={22} fill={isWishlisted ? 'var(--color-error)' : 'none'} />
            </button>
          </div>

          <hr style={styles.divider} />

          {/* Delivery Pincode Checker */}
          <div style={styles.deliveryBox}>
            <h4 style={styles.optionLabel}>Check Cash On Delivery & Expected Arrival</h4>
            <form onSubmit={handlePincodeCheck} style={styles.pincodeForm}>
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 560001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                style={styles.pincodeInput}
              />
              <button type="submit" style={styles.pincodeBtn}>
                Check Pincode
              </button>
            </form>
            {deliveryStatus && (
              <p
                style={{
                  ...styles.deliveryMessage,
                  color: deliveryStatus.success ? 'var(--color-success)' : 'var(--color-error)',
                }}
              >
                {deliveryStatus.message}
              </p>
            )}
          </div>

          <hr style={styles.divider} />

          {/* Highlights Checklist */}
          <div style={styles.highlightsGrid}>
            <div style={styles.highlightItem}>
              <ShieldCheck size={20} style={styles.highlightIcon} />
              <div>
                <span style={styles.highlightTitle}>100% Genuine Brand Guarantee</span>
                <p style={styles.highlightDesc}>Direct supply from international warehouse chains.</p>
              </div>
            </div>
            <div style={styles.highlightItem}>
              <RotateCcw size={20} style={styles.highlightIcon} />
              <div>
                <span style={styles.highlightTitle}>15 Days Reverse Exchange</span>
                <p style={styles.highlightDesc}>Hassle-free reverse pick up at zero extra charge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div style={styles.specsContainer}>
        <h3 style={styles.sectionHeading}>Product Specifications</h3>
        <div style={styles.specsTableWrapper}>
          <table style={styles.specsTable}>
            <tbody>
              {Object.entries(product.specs).map(([key, val]) => (
                <tr key={key} style={styles.specsRow}>
                  <td style={styles.specsLabel}>{key}</td>
                  <td style={styles.specsVal}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews Details List */}
      <div style={styles.reviewsContainer}>
        <h3 style={styles.sectionHeading}>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div style={styles.reviewsList}>
            {product.reviews.map((rev, idx) => (
              <div key={idx} style={styles.revItem} className="glass-panel">
                <div style={styles.revTop}>
                  <div style={styles.revLeft}>
                    <strong>{rev.name}</strong>
                    {rev.verified && (
                      <span style={styles.verifiedBadge}>
                        <Check size={10} style={{ marginRight: '3px' }} />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span style={styles.revDate}>{rev.date}</span>
                </div>
                <div style={styles.stars} style={{ margin: '8px 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < rev.rating ? 'var(--accent-gold)' : 'none'}
                      color="var(--accent-gold)"
                    />
                  ))}
                </div>
                <p style={styles.revText}>{rev.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noReviews}>No ratings or reviews submitted for this garment yet.</p>
        )}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div style={styles.similarContainer}>
          <h3 style={styles.sectionHeading}>Similar Luxury Apparel</h3>
          <div className="grid-cols-4">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setSimilarProductQuick(prod)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick View Modal Overlay for similar recommendations */}
      {similarProductQuick && (
        <ProductQuickView
          product={similarProductQuick}
          onClose={() => setSimilarProductQuick(null)}
        />
      )}
    </div>
  );
}

const styles = {
  detailPage: {
    paddingTop: '24px',
    paddingBottom: '80px',
  },
  loading: {
    padding: '100px 0',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '32px',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    flexWrap: 'wrap',
  },
  breadLink: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  breadIcon: {
    opacity: 0.5,
  },
  breadCurrent: {
    color: 'var(--text-primary)',
    fontWeight: '600',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '60px',
  },
  galleryCol: {
    display: 'flex',
    gap: '16px',
  },
  thumbsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '80px',
    flexShrink: 0,
  },
  thumbCard: {
    width: '80px',
    height: '100px',
    borderRadius: '2px',
    border: '2px solid transparent',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-secondary)',
    transition: 'border-color 0.2s',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mainImageWrapper: {
    flexGrow: 1,
    height: '600px',
    backgroundColor: 'var(--bg-secondary)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'zoom-in',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  zoomOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: '200%', // Magnification multiplier
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: 5,
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.875rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--accent-gold)',
    marginBottom: '8px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '12px',
    lineHeight: '1.2',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  stars: {
    display: 'flex',
    gap: '2px',
  },
  ratingText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '20px',
    borderRadius: 'var(--border-radius-sm)',
    marginBottom: '24px',
    transition: 'background-color var(--transition-smooth)',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px',
    marginBottom: '4px',
  },
  discountedPrice: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  originalPrice: {
    fontSize: '1.25rem',
    color: 'var(--text-muted)',
    textDecoration: 'line-through',
  },
  discountBadge: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '2px',
    letterSpacing: '0.05em',
  },
  taxLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    marginBottom: '28px',
  },
  optionSection: {
    marginBottom: '24px',
  },
  optionLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    marginBottom: '10px',
  },
  colorWrapper: {
    display: 'flex',
    gap: '10px',
  },
  colorBubble: {
    width: '28px',
    height: '28px',
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
    width: '44px',
    height: '44px',
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
    marginTop: '12px',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    height: '50px',
    borderRadius: 'var(--border-radius-sm)',
  },
  qtyBtn: {
    width: '40px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
  },
  qtyVal: {
    padding: '0 16px',
    fontSize: '0.95rem',
    fontWeight: '600',
    minWidth: '40px',
    textAlign: 'center',
  },
  cartBtn: {
    flexGrow: 1,
    height: '50px',
  },
  buyBtn: {
    flexGrow: 1,
    height: '50px',
  },
  wishlistBtn: {
    width: '50px',
    height: '50px',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '28px 0',
  },
  deliveryBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  pincodeForm: {
    display: 'flex',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
  },
  pincodeInput: {
    flexGrow: 1,
    padding: '12px 16px',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-secondary)',
  },
  pincodeBtn: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '0 20px',
    transition: 'opacity 0.2s',
  },
  deliveryMessage: {
    fontSize: '0.8rem',
    fontWeight: '500',
    marginTop: '4px',
    lineHeight: '1.4',
  },
  highlightsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  highlightItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  highlightIcon: {
    color: 'var(--accent-gold)',
    flexShrink: 0,
    marginTop: '2px',
  },
  highlightTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  highlightDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  specsContainer: {
    marginTop: '80px',
  },
  sectionHeading: {
    fontSize: '1.25rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '24px',
    borderBottom: '2px solid var(--text-primary)',
    paddingBottom: '8px',
    display: 'inline-block',
  },
  specsTableWrapper: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
  },
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  specsRow: {
    borderBottom: '1px solid var(--border-color)',
  },
  specsLabel: {
    padding: '14px 20px',
    fontWeight: '700',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--bg-secondary)',
    width: '280px',
  },
  specsVal: {
    padding: '14px 20px',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
  },
  reviewsContainer: {
    marginTop: '60px',
  },
  reviewsList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  revItem: {
    padding: '24px',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
  },
  revTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  revLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  verifiedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.6rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    color: 'var(--color-success)',
    padding: '2px 6px',
    borderRadius: '2px',
  },
  revDate: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  revText: {
    fontSize: '0.825rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  noReviews: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  similarContainer: {
    marginTop: '80px',
  },
};

// Embedded detail overrides
const css = `
span[style*="breadLink"]:hover {
  color: var(--accent-gold) !important;
}
div[style*="thumbCard"]:hover {
  border-color: var(--accent-gold) !important;
}
button[style*="colorBubble"]:hover {
  transform: scale(1.1);
}
button[style*="wishlistBtn"]:hover {
  transform: scale(1.05);
  border-color: var(--color-error);
}
form[style*="pincodeForm"] button:hover {
  opacity: 0.8;
}
@media (max-width: 992px) {
  div[style*="gridTemplateColumns: 1.2fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
  div[style*="galleryCol"] {
    flex-direction: column-reverse !important;
  }
  div[style*="thumbsWrapper"] {
    flex-direction: row !important;
    width: 100% !important;
  }
  div[style*="thumbCard"] {
    width: 70px !important;
    height: 85px !important;
  }
  div[style*="mainImageWrapper"] {
    height: 480px !important;
  }
}
@media (max-width: 768px) {
  div[style*="actionRow"] {
    flex-wrap: wrap !important;
  }
  div[style*="quantityContainer"] {
    width: 100% !important;
    justify-content: space-between !important;
  }
  button[style*="cartBtn"], button[style*="buyBtn"] {
    flex-grow: 1 !important;
    width: calc(50% - 6px) !important;
  }
  button[style*="wishlistBtn"] {
    width: 100% !important;
  }
  div[style*="reviewsList"] {
    grid-template-columns: 1fr !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
