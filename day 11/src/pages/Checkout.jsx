import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function Checkout() {
  const { cart, clearCart, user, addToast } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract coupon info passed from Cart state
  const discountPercentage = location.state?.discountPercentage || 0;
  const activeCoupon = location.state?.activeCoupon || '';

  // Pricing math
  const subtotal = cart.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const taxableAmount = subtotal - discountAmount;
  const gst = Math.round(taxableAmount * 0.18);
  const shipping = cart.length === 0 ? 0 : taxableAmount >= 999 ? 0 : 99;
  const total = taxableAmount + gst + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city || !stateName || !zip) {
      addToast('Please complete all shipping address fields.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const generatedId = 'UT' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
      addToast(`Order placed successfully! Order ID: ${generatedId}`, 'success');
    }, 1800);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={styles.emptyCheckout} className="container fade-in">
        <h2>No Items For Checkout</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Please add items to your cart first.
        </p>
        <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div style={styles.checkoutPage} className="container fade-in">
      <button onClick={() => navigate('/cart')} style={styles.backBtn}>
        <ArrowLeft size={16} style={{ marginRight: '6px' }} />
        <span>Return to Shopping Bag</span>
      </button>

      <h1 style={styles.pageTitle}>Secure Checkout</h1>

      <div style={styles.layout}>
        {/* Left Column: Form details */}
        <div style={styles.formCol}>
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping details */}
            <div style={styles.formBlock} className="glass-panel">
              <h3 style={styles.blockTitle}>
                <Truck size={18} style={styles.blockIcon} />
                Shipping Information
              </h3>
              
              <div style={styles.formGrid}>
                <div className="form-group" style={{ ...styles.formGroup, gridColumn: 'span 2' }}>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={{ ...styles.formGroup, gridColumn: 'span 2' }}>
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Apartment, suite, unit, block..."
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="State name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="6-digit zip"
                    maxLength={6}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment options */}
            <div style={{ ...styles.formBlock, marginTop: '24px' }} className="glass-panel">
              <h3 style={styles.blockTitle}>
                <CreditCard size={18} style={styles.blockIcon} />
                Payment Method
              </h3>

              <div style={styles.paymentList}>
                <label style={styles.paymentRow}>
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                    style={styles.radioInput}
                  />
                  <div>
                    <span style={styles.payName}>Credit / Debit Card</span>
                    <p style={styles.payDesc}>Pay securely with Visa, Mastercard or RuPay cards.</p>
                  </div>
                </label>

                <label style={styles.paymentRow}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    style={styles.radioInput}
                  />
                  <div>
                    <span style={styles.payName}>UPI Transfer (GooglePay/PhonePe)</span>
                    <p style={styles.payDesc}>Instant verification with any secure UPI application.</p>
                  </div>
                </label>

                <label style={styles.paymentRow}>
                  <input
                    type="radio"
                    name="payment"
                    value="net"
                    checked={paymentMethod === 'net'}
                    onChange={() => setPaymentMethod('net')}
                    style={styles.radioInput}
                  />
                  <div>
                    <span style={styles.payName}>Net Banking</span>
                    <p style={styles.payDesc}>Redirect to all major Indian banking partners.</p>
                  </div>
                </label>

                <label style={styles.paymentRow}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={styles.radioInput}
                  />
                  <div>
                    <span style={styles.payName}>Cash on Delivery (COD)</span>
                    <p style={styles.payDesc}>Pay in cash or card upon product arrival. Extra ₹40 may apply.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={styles.submitBtn}
            >
              {loading ? 'Processing transaction...' : `Pay & Place Order (₹${total.toLocaleString()})`}
            </button>
          </form>
        </div>

        {/* Right Column: Mini Order summary review */}
        <div style={styles.summaryCol}>
          <div style={styles.summaryCard} className="glass-panel">
            <h3 style={styles.summaryTitle}>Review Your Items</h3>
            <div style={styles.itemList}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} style={styles.itemRow}>
                  <img src={item.product.mainImage} alt={item.product.title} style={styles.itemImage} />
                  <div style={styles.itemMeta}>
                    <span style={styles.itemTitle}>{item.product.title}</span>
                    <span style={styles.itemOptions}>
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </span>
                    <span style={styles.itemPrice}>
                      {item.quantity} x ₹{item.product.discountedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <hr style={styles.divider} />

            <div style={styles.calcLines}>
              <div style={styles.calcLine}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {activeCoupon && (
                <div style={{ ...styles.calcLine, color: 'var(--color-success)' }}>
                  <span>Discount ({activeCoupon})</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={styles.calcLine}>
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div style={styles.calcLine}>
                <span>Shipping Charges</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.totalLine}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Confirmation */}
      {orderPlaced && (
        <div style={styles.modalOverlay} className="fade-in">
          <div style={styles.modalContent} className="slide-up glass-panel">
            <CheckCircle size={56} style={{ color: 'var(--color-success)', marginBottom: '16px' }} />
            <h2 style={styles.modalHeading}>Order Confirmed!</h2>
            <p style={styles.modalSub}>
              Thank you for shopping with UrbanThreads. Your premium garment selection has been registered.
            </p>

            <div style={styles.orderDetailsBox}>
              <div style={styles.orderDetailRow}>
                <span>Order Reference:</span>
                <strong>{orderId}</strong>
              </div>
              <div style={styles.orderDetailRow}>
                <span>Estimated Arrival:</span>
                <strong>3-5 Business Days</strong>
              </div>
              <div style={styles.orderDetailRow}>
                <span>Billing Total:</span>
                <strong>₹{total.toLocaleString()}</strong>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              A secure confirmation receipt along with billing tax breakdown has been dispatched to {email}.
            </p>

            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={styles.modalCloseBtn}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  checkoutPage: {
    paddingTop: '32px',
    paddingBottom: '80px',
  },
  emptyCheckout: {
    padding: '80px 20px',
    textAlign: 'center',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
    transition: 'color 0.2s',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '32px',
  },
  layout: {
    display: 'flex',
    gap: '40px',
  },
  formCol: {
    flexGrow: 1,
  },
  formBlock: {
    padding: '30px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
  },
  blockTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '20px',
  },
  blockIcon: {
    color: 'var(--accent-gold)',
    marginRight: '8px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  formGroup: {
    marginBottom: '0px',
  },
  paymentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  paymentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  radioInput: {
    accentColor: 'var(--accent-gold)',
    marginTop: '4px',
  },
  payName: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    display: 'block',
  },
  payDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  submitBtn: {
    width: '100%',
    height: '50px',
    marginTop: '24px',
  },
  summaryCol: {
    width: '380px',
    flexShrink: 0,
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
    fontSize: '0.9rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  itemRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  itemImage: {
    width: '50px',
    height: '62px',
    objectFit: 'cover',
    borderRadius: '2px',
    backgroundColor: 'var(--bg-secondary)',
  },
  itemMeta: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.3',
  },
  itemOptions: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
  },
  itemPrice: {
    fontSize: '0.75rem',
    fontWeight: '700',
    marginTop: '2px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '16px 0',
  },
  calcLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  calcLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  totalLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(6px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalContent: {
    maxWidth: '500px',
    width: '100%',
    padding: '40px',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: 'var(--shadow-premium)',
  },
  modalHeading: {
    fontSize: '1.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  modalSub: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  orderDetailsBox: {
    width: '100%',
    backgroundColor: 'var(--bg-secondary)',
    padding: '16px 20px',
    borderRadius: 'var(--border-radius-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
    border: '1px solid var(--border-color)',
    transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)',
  },
  orderDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
  },
  modalCloseBtn: {
    width: '100%',
    height: '46px',
  },
};

// Embedded hover changes
const css = `
button[style*="backBtn"]:hover {
  color: var(--accent-gold) !important;
}
label[style*="paymentRow"]:hover {
  background-color: var(--bg-secondary);
}
label[style*="paymentRow"]:has(input:checked) {
  border-color: var(--accent-gold) !important;
}
@media (max-width: 992px) {
  div[style*="layout"] {
    flex-direction: column-reverse !important;
  }
  div[style*="summaryCol"] {
    width: 100% !important;
  }
}
@media (max-width: 576px) {
  div[style*="formGrid"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="formGroup"][style*="grid-column: span 2"] {
    grid-column: span 1 !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
