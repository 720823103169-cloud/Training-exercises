import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, Trash2 } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function Navbar() {
  const { cart, wishlist, user, logoutUser, darkMode, setDarkMode, products } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cart total items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Filter products for autocomplete dropdown
  const suggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchQuery('');
    setSearchFocused(false);
    navigate(`/product/${productId}`);
  };

  return (
    <header style={styles.header}>
      {/* Promo banner */}
      <div style={styles.promoBanner}>
        <div className="container" style={styles.promoContent}>
          <span>FREE SHIPPING ON ALL ORDERS ABOVE ₹999</span>
          <div style={styles.promoRight}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={styles.themeToggle}
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={14} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={14} />}
              <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>
                {darkMode ? 'LIGHT MODE' : 'DARK MODE'}
              </span>
            </button>
            <span style={styles.sep}>|</span>
            <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>CALL US: +91 80 4912 3000</span>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div style={styles.mainNav} className="glass-panel">
        <div className="container" style={styles.navContainer}>
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={styles.mobileMenuBtn}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" style={styles.logoWrapper}>
            <span style={styles.logoMain}>URBAN</span>
            <span style={styles.logoSub}>THREADS</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav style={styles.navLinks}>
            <Link to="/" style={location.pathname === '/' ? styles.activeLink : styles.link}>Home</Link>
            <Link to="/shop?tag=new" style={location.search.includes('tag=new') ? styles.activeLink : styles.link}>New Arrivals</Link>
            <Link to="/shop?category=Clothing" style={location.search.includes('category=Clothing') ? styles.activeLink : styles.link}>Clothing</Link>
            <Link to="/shop?category=Shoes" style={location.search.includes('category=Shoes') ? styles.activeLink : styles.link}>Shoes</Link>
            <Link to="/shop?category=Accessories" style={location.search.includes('category=Accessories') ? styles.activeLink : styles.link}>Accessories</Link>
            <Link to="/shop?sale=true" style={location.search.includes('sale=true') ? styles.activeLink : styles.link}>Sale</Link>
          </nav>

          {/* Right Side Actions */}
          <div style={styles.rightActions}>
            {/* Search Bar - Desktop */}
            <div ref={searchRef} style={styles.searchWrapper}>
              <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search brands, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  style={styles.searchInput}
                />
                <button type="submit" style={styles.searchBtn} aria-label="Search">
                  <Search size={18} />
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {searchFocused && suggestions.length > 0 && (
                <div style={styles.suggestionsBox} className="glass-panel">
                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSuggestionClick(p.id)}
                      style={styles.suggestionItem}
                      className="suggestion-hover"
                    >
                      <img src={p.mainImage} alt={p.title} style={styles.suggestionImage} />
                      <div style={styles.suggestionDetails}>
                        <span style={styles.suggestionBrand}>{p.brand}</span>
                        <span style={styles.suggestionTitle}>{p.title}</span>
                        <span style={styles.suggestionPrice}>₹{p.discountedPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={handleSearchSubmit}
                    style={styles.suggestionsMore}
                  >
                    See all matching products →
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/shop?wishlist=true" style={styles.iconBtn} aria-label={`Wishlist with ${wishlistCount} items`}>
              <Heart size={20} />
              {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link to="/cart" style={styles.iconBtn} aria-label={`Shopping Cart with ${cartCount} items`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </Link>

            {/* User Account / Auth */}
            {user.loggedIn ? (
              <div style={styles.accountWrapper} className="account-dropdown-trigger">
                <button style={styles.iconBtn} aria-label="User Account">
                  <User size={20} />
                </button>
                <div style={styles.accountDropdown} className="glass-panel account-dropdown-content">
                  <div style={styles.dropdownHeader}>
                    <strong>Hi, {user.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>
                  <hr style={styles.dropDivider} />
                  <Link to="/shop?wishlist=true" style={styles.dropItem}>My Wishlist</Link>
                  <button onClick={logoutUser} style={{ ...styles.dropItem, ...styles.logoutBtn }}>
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/auth" style={styles.loginBtn}>
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.mobileMenu} className="glass-panel fade-in" onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileMenuHeader}>
              <span style={styles.logoMain}>URBAN</span>
              <span style={styles.logoSub}>THREADS</span>
              <button onClick={() => setMobileMenuOpen(false)} style={styles.mobileCloseBtn}>
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <div style={styles.mobileSearchWrapper}>
              <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <button type="submit" style={styles.searchBtn}>
                  <Search size={18} />
                </button>
              </form>
            </div>

            <nav style={styles.mobileLinks}>
              <Link to="/" style={styles.mobileLink}>Home</Link>
              <Link to="/shop?tag=new" style={styles.mobileLink}>New Arrivals</Link>
              <Link to="/shop?category=Clothing" style={styles.mobileLink}>Clothing</Link>
              <Link to="/shop?category=Shoes" style={styles.mobileLink}>Shoes</Link>
              <Link to="/shop?category=Accessories" style={styles.mobileLink}>Accessories</Link>
              <Link to="/shop?sale=true" style={styles.mobileLink}>Sale</Link>
              <hr style={styles.dropDivider} />
              {user.loggedIn ? (
                <>
                  <div style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Logged in as: <strong>{user.name}</strong>
                  </div>
                  <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} style={{ ...styles.mobileLink, color: 'var(--color-error)' }}>
                    Log Out
                  </button>
                </>
              ) : (
                <Link to="/auth" style={styles.mobileLink}>Login / Register</Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
  },
  promoBanner: {
    backgroundColor: '#111111',
    color: '#FFFFFF',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  promoContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  themeToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#FFFFFF',
  },
  sep: {
    opacity: 0.3,
  },
  mainNav: {
    height: 'var(--header-height)',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  mobileMenuBtn: {
    display: 'none',
    color: 'var(--text-primary)',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  },
  logoMain: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  logoSub: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: '300',
    letterSpacing: '0.05em',
    color: 'var(--accent-gold)',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  link: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
    padding: '8px 0',
    borderBottom: '2px solid transparent',
  },
  activeLink: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--accent-gold)',
    padding: '8px 0',
    borderBottom: '2px solid var(--accent-gold)',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    position: 'relative',
    width: '240px',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '20px',
    padding: '4px 12px',
    border: '1px solid var(--border-color)',
    width: '100%',
  },
  searchInput: {
    fontSize: '0.8rem',
    width: '100%',
    padding: '4px 6px',
    color: 'var(--text-primary)',
  },
  searchBtn: {
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionsBox: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '100%',
    marginTop: '8px',
    borderRadius: 'var(--border-radius-sm)',
    boxShadow: 'var(--shadow-medium)',
    overflow: 'hidden',
    zIndex: 9999,
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
  },
  suggestionItem: {
    display: 'flex',
    gap: '12px',
    padding: '10px 16px',
    borderBottom: '1px solid var(--border-color)',
    cursor: 'pointer',
  },
  suggestionImage: {
    width: '40px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '2px',
    backgroundColor: 'var(--bg-secondary)',
  },
  suggestionDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  suggestionBrand: {
    fontSize: '0.6rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
  },
  suggestionTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
  },
  suggestionPrice: {
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  suggestionsMore: {
    padding: '10px 16px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textAlign: 'center',
    cursor: 'pointer',
    color: 'var(--accent-gold)',
    backgroundColor: 'var(--bg-secondary)',
  },
  iconBtn: {
    color: 'var(--text-primary)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'var(--accent-gold)',
    color: '#000000',
    fontSize: '0.6rem',
    fontWeight: '700',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: 'var(--bg-primary)',
    backgroundColor: 'var(--text-primary)',
    padding: '8px 16px',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'opacity 0.2s',
  },
  accountWrapper: {
    position: 'relative',
  },
  accountDropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    width: '200px',
    marginTop: '12px',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--border-color)',
    padding: '12px 0',
    zIndex: 9999,
    boxShadow: 'var(--shadow-medium)',
    backgroundColor: 'var(--bg-primary)',
    display: 'none', // Managed via CSS hover logic
  },
  dropdownHeader: {
    padding: '4px 16px 8px 16px',
    fontSize: '0.85rem',
  },
  dropDivider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '8px 0',
  },
  dropItem: {
    display: 'block',
    width: '100%',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontWeight: '500',
    textAlign: 'left',
    color: 'var(--text-secondary)',
    transition: 'background-color 0.2s, color 0.2s',
  },
  logoutBtn: {
    color: 'var(--color-error)',
  },
  mobileNavOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
  },
  mobileMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    maxWidth: '300px',
    height: '100%',
    backgroundColor: 'var(--bg-primary)',
    boxShadow: 'var(--shadow-premium)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
  },
  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  mobileCloseBtn: {
    color: 'var(--text-primary)',
  },
  mobileSearchWrapper: {
    marginBottom: '24px',
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mobileLink: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    display: 'block',
  },
};

// Embedded styling for dynamic hover menus, active link marks, and responsive behaviors
const css = `
:root.dark header div[style*="mainNav"] {
  background-color: rgba(17, 17, 17, 0.85) !important;
}
header a:hover {
  color: var(--accent-gold) !important;
}
header button:hover {
  color: var(--accent-gold) !important;
}
.suggestion-hover:hover {
  background-color: var(--bg-secondary);
}
.account-dropdown-trigger:hover .account-dropdown-content {
  display: block !important;
}
.account-dropdown-content a:hover, .account-dropdown-content button:hover {
  background-color: var(--bg-secondary);
}
@media (max-width: 992px) {
  header div[style*="promoContent"] span:first-child {
    font-size: 0.6rem !important;
  }
  header nav[style*="navLinks"] {
    display: none !important;
  }
  header button[style*="mobileMenuBtn"] {
    display: flex !important;
  }
  header div[style*="searchWrapper"] {
    display: none !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
