import React, { useContext, useState } from 'react';
import { X, GitCompare, Star, ShoppingCart, Trash2 } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function CompareDrawer() {
  const { compareList, products, toggleCompare, clearCompare, addToCart } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  // Filter products in the compare list
  const comparedItems = products.filter((p) => compareList.includes(p.id));

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <>
      {/* Sticky Bottom bar preview */}
      <div style={styles.bottomBar} className="glass-panel">
        <div style={styles.barContent}>
          <div style={styles.barLeft}>
            <GitCompare size={20} style={{ color: 'var(--accent-gold)' }} />
            <span style={styles.barTitle}>
              Product Comparison ({comparedItems.length} of 3)
            </span>
          </div>

          <div style={styles.barRight}>
            <button onClick={clearCompare} style={styles.clearBtn}>
              Clear All
            </button>
            <button onClick={() => setIsOpen(true)} style={styles.compareBtn}>
              Compare Now
            </button>
          </div>
        </div>
      </div>

      {/* Full Comparison Table Modal */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)} className="fade-in">
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
            className="slide-up glass-panel"
          >
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleRow}>
                <GitCompare size={22} style={{ color: 'var(--accent-gold)' }} />
                <h2 style={styles.modalTitle}>Product Comparison Matrix</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeBtn}
                aria-label="Close Comparison"
              >
                <X size={22} />
              </button>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, width: '200px' }}>Features</th>
                    {comparedItems.map((item) => (
                      <th key={item.id} style={styles.th}>
                        <div style={styles.prodHeader}>
                          <button
                            onClick={() => toggleCompare(item.id)}
                            style={styles.removeBtn}
                            title="Remove from comparison"
                          >
                            <Trash2 size={14} />
                          </button>
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            style={styles.prodImage}
                          />
                          <span style={styles.prodBrand}>{item.brand}</span>
                          <span style={styles.prodTitle}>{item.title}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tdLabel}>Price</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        <div style={styles.priceCol}>
                          <span style={styles.discPrice}>₹{item.discountedPrice.toLocaleString()}</span>
                          {item.originalPrice > item.discountedPrice && (
                            <span style={styles.origPrice}>₹{item.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Category</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        {item.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Rating</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        <div style={styles.ratingRow}>
                          <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                          <span style={styles.ratingText}>
                            {item.rating} ({item.ratingCount} reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Sizes</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        {item.sizes.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Colors</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        {item.colors.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Specification Highlights</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        <ul style={styles.specsList}>
                          {Object.entries(item.specs).map(([key, value]) => (
                            <li key={key} style={styles.specItem}>
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={styles.tdLabel}>Action</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} style={styles.td}>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="btn btn-primary"
                          style={styles.addCartBtn}
                        >
                          <ShoppingCart size={14} style={{ marginRight: '6px' }} />
                          Add to Cart
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  bottomBar: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    zIndex: 999,
    padding: '16px 24px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTop: '1px solid var(--border-color)',
  },
  barContent: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  barTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    letterSpacing: '0.02em',
  },
  barRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  clearBtn: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  compareBtn: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '10px 20px',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'opacity 0.2s',
  },
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
    maxWidth: '1000px',
    maxHeight: '85vh',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-premium)',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  closeBtn: {
    color: 'var(--text-primary)',
    transition: 'transform 0.2s',
  },
  tableWrapper: {
    padding: '32px',
    overflowX: 'auto',
    flexGrow: 1,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '12px 16px',
    borderBottom: '2px solid var(--border-color)',
    verticalAlign: 'bottom',
  },
  tdLabel: {
    padding: '16px',
    fontWeight: '700',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    width: '200px',
  },
  td: {
    padding: '16px',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
    verticalAlign: 'top',
  },
  prodHeader: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: '6px',
  },
  removeBtn: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  prodImage: {
    width: '60px',
    height: '75px',
    objectFit: 'cover',
    borderRadius: '2px',
    backgroundColor: 'var(--bg-secondary)',
    marginBottom: '6px',
  },
  prodBrand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.6rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--accent-gold)',
  },
  prodTitle: {
    fontWeight: '600',
    fontSize: '0.85rem',
    lineHeight: '1.3',
  },
  priceCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  discPrice: {
    fontWeight: '700',
    fontSize: '0.95rem',
  },
  origPrice: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textDecoration: 'line-through',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  ratingText: {
    fontWeight: '600',
  },
  specsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  specItem: {
    fontSize: '0.8rem',
    lineHeight: '1.4',
  },
  addCartBtn: {
    padding: '8px 16px',
    fontSize: '0.75rem',
    width: '100%',
  },
};

// Embedded custom styles for hover transitions
const css = `
button[style*="clearBtn"]:hover {
  color: var(--text-primary) !important;
}
button[style*="compareBtn"]:hover {
  opacity: 0.8;
}
button[style*="removeBtn"]:hover {
  color: var(--color-error) !important;
}
table tr:hover td {
  background-color: var(--bg-secondary);
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
