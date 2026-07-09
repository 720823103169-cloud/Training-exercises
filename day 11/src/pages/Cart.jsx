import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Tag } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, addToast } = useContext(ShopContext);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage discount
  const [activeCoupon, setActiveCoupon] = useState('');
  const navigate = useNavigate();

  // Pricing math
  const subtotal = cart.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0);
  
  // Calculate discount amount
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  
  // GST calculation (18% inclusive or exclusive - let's make it standard 18% of post-coupon subtotal)
  const taxableAmount = subtotal - discountAmount;
  const gst = Math.round(taxableAmount * 0.18);
  
  // Shipping: Free above ₹999, else ₹99. If cart is empty, shipping is 0
  const shipping = cart.length === 0 ? 0 : taxableAmount >= 999 ? 0 : 99;
  
  const total = taxableAmount + gst + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'URBAN50') {
      setAppliedDiscount(50);
      setActiveCoupon('URBAN50');
      addToast('Promo Code URBAN50 applied! Enjoy 50% off.', 'success');
      setCouponCode('');
    } else if (code === 'FREE999' || code === 'WELCOME15') {
      setAppliedDiscount(15);
      setActiveCoupon(code);
      addToast(`Promo Code ${code} applied! Enjoy 15% off.`, 'success');
      setCouponCode('');
    } else {
      addToast('Invalid coupon code. Try URBAN50 or WELCOME15!', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setActiveCoupon('');
    addToast('Promo Coupon removed.', 'info');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast('Your cart is empty. Add items to checkout.', 'warning');
      return;
    }
    navigate('/checkout', { state: { discountPercentage: appliedDiscount, activeCoupon } });
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart} className="container fade-in">
        <ShoppingBag size={64} style={{ color: 'var(--text-muted)', marginBottom: '20px' }} />
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Explore our collections and discover premium men's garments.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.cartPage} className="container fade-in">
      <h1 style={styles.pageTitle}>Shopping Bag</h1>

      <div style={styles.layout}>
        {/* Left: Cart Items list */}
        <div style={styles.itemsCol}>
          <div style={styles.itemsHeader}>
            <span>Product Details</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          <div style={styles.itemsList}>
            {cart.map((item) => {
              const productTotal = item.product.discountedPrice * item.quantity;

              return (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} style={styles.itemRow}>
                  {/* Image & Details */}
                  <div style={styles.productDetails}>
                    <img src={item.product.mainImage} alt={item.product.title} style={styles.itemImage} />
                    <div style={styles.itemMeta}>
                      <span style={styles.itemBrand}>{item.product.brand}</span>
                      <Link to={`/product/${item.product.id}`} style={styles.itemTitleLink}>
                        <h3 style={styles.itemTitle}>{item.product.title}</h3>
                      </Link>
                      <div style={styles.itemOptions}>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                        <span style={styles.sep}>|</span>
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                      </div>
                      <span style={styles.itemPrice}>₹{item.product.discountedPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={styles.qtyContainer}>
                    <div style={styles.qtyBox}>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        style={styles.qtyBtn}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={styles.qtyVal}>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        style={styles.qtyBtn}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      style={styles.removeBtn}
                      title="Remove Item"
                    >
                      <Trash2 size={14} style={{ marginRight: '4px' }} />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Product row total */}
                  <div style={styles.rowTotal}>
                    ₹{productTotal.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Checkout Billing Column */}
        <div style={styles.summaryCol}>
          <div style={styles.summaryCard} className="glass-panel">
            <h3 style={styles.summaryTitle}>Order Summary</h3>

            {/* Price Calculations */}
            <div style={styles.calcLines}>
              <div style={styles.calcLine}>
                <span>Bag Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {activeCoupon && (
                <div style={{ ...styles.calcLine, color: 'var(--color-success)' }}>
                  <span>Coupon Discount ({appliedDiscount}%)</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={styles.calcLine}>
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>

              <div style={styles.calcLine}>
                <span>Shipping Charges</span>
                <span>{shipping === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `₹${shipping}`}</span>
              </div>

              {shipping > 0 && (
                <p style={styles.shippingNotice}>
                  Add ₹{(999 - taxableAmount).toLocaleString()} more to qualify for FREE Shipping!
                </p>
              )}

              <hr style={styles.calcDivider} />

              <div style={styles.totalLine}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button onClick={handleCheckout} style={styles.checkoutBtn} className="btn btn-primary">
              <span>Secure Checkout</span>
              <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </div>

          {/* Coupon Code Panel */}
          <div style={styles.couponCard} className="glass-panel">
            <h4 style={styles.couponTitle}>Apply Promo Code</h4>
            
            {activeCoupon ? (
              <div style={styles.appliedCouponBox}>
                <div style={styles.couponBadgeRow}>
                  <Tag size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={styles.couponBadgeText}>CODE APPLIED: {activeCoupon}</span>
                </div>
                <button onClick={handleRemoveCoupon} style={styles.removeCouponBtn}>
                  Remove Coupon
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                <input
                  type="text"
                  placeholder="Try URBAN50 (50% Off)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={styles.couponInput}
                />
                <button type="submit" style={styles.couponBtn}>
                  Apply
                </button>
              </form>
            )}
            <p style={styles.couponHelp}>Enjoy flat discounts by using valid seasonal promo vouchers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cartPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '32px',
  },
  emptyCart: {
    padding: '80px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '60vh',
    justifyContent: 'center',
  },
  layout: {
    display: 'flex',
    gap: '40px',
  },
  itemsCol: {
    flexGrow: 1,
  },
  itemsHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border-color)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    alignItems: 'center',
    padding: '24px 0',
    borderBottom: '1px solid var(--border-color)',
  },
  productDetails: {
    display: 'flex',
    gap: '16px',
  },
  itemImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '2px',
    backgroundColor: 'var(--bg-secondary)',
  },
  itemMeta: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
  },
  itemBrand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
  },
  itemTitleLink: {
    alignSelf: 'flex-start',
  },
  itemTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.4',
  },
  itemOptions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  sep: {
    opacity: 0.3,
  },
  itemPrice: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginTop: '2px',
  },
  qtyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    transition: 'background-color 0.2s',
  },
  qtyVal: {
    padding: '0 10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center',
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  rowTotal: {
    fontSize: '0.95rem',
    fontWeight: '700',
    textAlign: 'right',
  },
  summaryCol: {
    width: '380px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  summaryCard: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    padding: '30px',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)',
  },
  summaryTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  calcLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  calcLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  shippingNotice: {
    fontSize: '0.75rem',
    color: 'var(--accent-gold)',
    fontWeight: '500',
    lineHeight: '1.4',
  },
  calcDivider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '8px 0',
  },
  totalLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-heading)',
    fontSize: '1.05rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  checkoutBtn: {
    width: '100%',
    height: '46px',
    marginTop: '24px',
  },
  couponCard: {
    border: '1px solid var(--border-color)',
    padding: '24px',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
  },
  couponTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  couponForm: {
    display: 'flex',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
  },
  couponInput: {
    flexGrow: 1,
    padding: '10px 14px',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-secondary)',
  },
  couponBtn: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '0 16px',
    transition: 'opacity 0.2s',
  },
  appliedCouponBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    border: '1px dashed var(--color-success)',
    backgroundColor: 'rgba(46, 125, 50, 0.05)',
    borderRadius: 'var(--border-radius-sm)',
  },
  couponBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  couponBadgeText: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--color-success)',
  },
  removeCouponBtn: {
    fontSize: '0.7rem',
    color: 'var(--color-error)',
    fontWeight: '600',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  couponHelp: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    marginTop: '8px',
  },
};

// Embedded hover settings
const css = `
button[style*="removeBtn"]:hover {
  color: var(--color-error) !important;
}
form[style*="couponForm"] button:hover {
  opacity: 0.8;
}
@media (max-width: 992px) {
  div[style*="layout"] {
    flex-direction: column !important;
  }
  div[style*="summaryCol"] {
    width: 100% !important;
  }
}
@media (max-width: 576px) {
  div[style*="itemsHeader"] {
    display: none !important;
  }
  div[style*="itemRow"] {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    border-bottom: 2px solid var(--border-color) !important;
  }
  div[style*="qtyContainer"] {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  div[style*="rowTotal"] {
    text-align: left !important;
    font-weight: 800 !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
