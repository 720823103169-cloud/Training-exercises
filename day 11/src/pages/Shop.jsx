import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, Star, RefreshCw, Eye, Search, Heart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';

export default function Shop() {
  const { products, wishlist } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // For Infinite Scroll mock
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // States for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(18000); // Max range
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [discountFilter, setDiscountFilter] = useState(0); // Min discount percentage
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('popularity');

  // Load filters from URL parameters
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const catParam = params.get('category');
    const brandParam = params.get('brand');
    const saleParam = params.get('sale');
    const tagParam = params.get('tag');
    const wishlistParam = params.get('wishlist');

    // Reset filters first
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(18000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setRatingFilter(0);
    setDiscountFilter(0);
    setInStockOnly(false);
    setSearchQuery('');

    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (catParam) {
      // Handles custom matches or categories
      if (catParam === 'Clothing') {
        setSelectedCategories(['Shirts', 'T-Shirts', 'Jackets', 'Hoodies', 'Ethnic Wear', 'Blazers', 'Trousers', 'Jeans']);
      } else {
        setSelectedCategories([catParam]);
      }
    }
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
    if (saleParam === 'true') {
      setDiscountFilter(30); // Show items with 30%+ discount
    }
    if (wishlistParam === 'true') {
      // We will handle wishlist filtering in final query step
    }

    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [location.search]);

  // Extract unique filters from mock products data dynamically
  const allCategories = ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Hoodies', 'Ethnic Wear', 'Blazers', 'Shoes', 'Watches', 'Sunglasses', 'Bags'];
  const allBrands = ["Nike", "Adidas", "Puma", "Levi's", "Tommy Hilfiger", "Calvin Klein", "Jack & Jones", "U.S. Polo Assn.", "Van Heusen", "Allen Solly"];
  const allSizes = ['S', 'M', 'L', 'XL', '8', '9', '10', 'One Size'];
  const allColors = ['Black', 'White', 'Light Blue', 'Dark Gray', 'Navy Blue', 'Gold', 'Charcoal', 'Olive Green', 'Tan Brown', 'Heather Gray', 'Royal Blue', 'Gold Cream'];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(18000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setRatingFilter(0);
    setDiscountFilter(0);
    setInStockOnly(false);
    setSearchQuery('');
    navigate('/shop');
  };

  // Filter application
  let filteredProducts = products.filter((product) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        product.title.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // 2. Category
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(product.category)) return false;
    }

    // 3. Brand
    if (selectedBrands.length > 0) {
      if (!selectedBrands.includes(product.brand)) return false;
    }

    // 4. Price
    if (product.discountedPrice > priceRange) return false;

    // 5. Sizes
    if (selectedSizes.length > 0) {
      const sizeMatch = product.sizes.some((s) => selectedSizes.includes(s));
      if (!sizeMatch) return false;
    }

    // 6. Colors
    if (selectedColors.length > 0) {
      const colorMatch = product.colors.some((c) => selectedColors.includes(c));
      if (!colorMatch) return false;
    }

    // 7. Ratings
    if (product.rating < ratingFilter) return false;

    // 8. Discount
    if (product.discount < discountFilter) return false;

    // 9. Availability
    if (inStockOnly && !product.inStock) return false;

    // 10. Wishlist page view
    const params = new URLSearchParams(location.search);
    if (params.get('wishlist') === 'true') {
      if (!wishlist.includes(product.id)) return false;
    }

    return true;
  });

  // Sorting application
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'priceLow':
        return a.discountedPrice - b.discountedPrice;
      case 'priceHigh':
        return b.discountedPrice - a.discountedPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'popularity':
      default:
        return b.ratingCount - a.ratingCount;
    }
  });

  // Infinite Scroll mock loading trigger
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoading(false);
    }, 450);
  };

  const paginatedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div style={styles.shopPage} className="container fade-in">
      {/* Title & Stats */}
      <div style={styles.headerRow}>
        <div style={styles.headerLeft}>
          <h1 style={styles.pageTitle}>
            {new URLSearchParams(location.search).get('wishlist') === 'true'
              ? 'My Luxury Wishlist'
              : 'UrbanThreads Shop Catalog'}
          </h1>
          <p style={styles.productCount}>
            Showing {paginatedProducts.length} of {sortedProducts.length} products
          </p>
        </div>

        {/* Top Controls: Sorting and Filters Toggle */}
        <div style={styles.headerRight}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.filterToggleBtn}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>

          <div style={styles.sortWrapper}>
            <span style={styles.sortLabel}>Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="popularity">Popularity</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest Drops</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Sticky Filters Sidebar */}
        <aside
          style={{
            ...styles.sidebar,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)', // responsive toggle handled in class css
          }}
          className={`shop-sidebar ${sidebarOpen ? 'open' : ''}`}
        >
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>Filters</h3>
            <button onClick={handleClearAll} style={styles.clearAllBtn}>
              Clear All
            </button>
          </div>

          <hr style={styles.filterDivider} />

          {/* Search filter inline */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Keywords</h4>
            <div style={styles.sidebarSearch}>
              <input
                type="text"
                placeholder="Type keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.sidebarSearchInput}
              />
              <Search size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Categories Filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Categories</h4>
            <div style={styles.filterOptions}>
              {allCategories.map((cat) => (
                <label key={cat} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    style={styles.checkbox}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Brands</h4>
            <div style={styles.filterOptions}>
              {allBrands.map((brand) => (
                <label key={brand} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    style={styles.checkbox}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div style={styles.filterSection}>
            <div style={styles.priceRow}>
              <h4 style={styles.filterSectionTitle}>Max Price</h4>
              <span style={styles.priceVal}>₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={18000}
              step={500}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={styles.rangeSlider}
            />
          </div>

          {/* Size Filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Sizes</h4>
            <div style={styles.sizeOptions}>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  style={{
                    ...styles.sizeBtn,
                    borderColor: selectedSizes.includes(size) ? 'var(--text-primary)' : 'var(--border-color)',
                    backgroundColor: selectedSizes.includes(size) ? 'var(--text-primary)' : 'transparent',
                    color: selectedSizes.includes(size) ? 'var(--bg-primary)' : 'var(--text-primary)',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Colors</h4>
            <div style={styles.colorOptions}>
              {allColors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  style={{
                    ...styles.colorBtn,
                    borderColor: selectedColors.includes(color) ? 'var(--accent-gold)' : 'var(--border-color)',
                  }}
                  title={color}
                >
                  <span
                    style={{
                      ...styles.colorBtnInner,
                      backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' :
                                       color.toLowerCase() === 'black' ? '#111111' :
                                       color.toLowerCase() === 'gold' ? '#D4AF37' :
                                       color.toLowerCase() === 'charcoal' ? '#333333' :
                                       color.toLowerCase() === 'dark gray' ? '#555555' :
                                       color.toLowerCase() === 'light blue' ? '#ADD8E6' :
                                       color.toLowerCase() === 'navy' ? '#000080' :
                                       color.toLowerCase() === 'navy blue' ? '#000080' :
                                       color.toLowerCase() === 'olive green' ? '#556B2F' :
                                       color.toLowerCase() === 'tan brown' ? '#B87333' :
                                       color.toLowerCase() === 'heather gray' ? '#778899' :
                                       color.toLowerCase() === 'royal blue' ? '#4169E1' :
                                       color.toLowerCase() === 'gold cream' ? '#F5F5DC' :
                                       '#888888',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Minimum Rating</h4>
            <div style={styles.ratingStarsBox}>
              {[1, 2, 3, 4].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                  style={{
                    ...styles.ratingStarRow,
                    color: ratingFilter >= star ? 'var(--accent-gold)' : 'var(--text-muted)',
                  }}
                >
                  <Star size={16} fill={ratingFilter >= star ? 'var(--accent-gold)' : 'none'} />
                  <span style={{ fontSize: '0.8rem' }}>{star} Stars & Above</span>
                </button>
              ))}
            </div>
          </div>

          {/* Discount filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Minimum Discount</h4>
            <div style={styles.filterOptions}>
              {[10, 20, 30].map((disc) => (
                <label key={disc} style={styles.checkboxLabel}>
                  <input
                    type="radio"
                    name="discount"
                    checked={discountFilter === disc}
                    onChange={() => setDiscountFilter(disc)}
                    style={styles.checkbox}
                  />
                  <span>{disc}% OFF & Above</span>
                </label>
              ))}
              {discountFilter > 0 && (
                <button onClick={() => setDiscountFilter(0)} style={styles.resetRadioBtn}>
                  Reset Discount Filter
                </button>
              )}
            </div>
          </div>

          {/* Availability filter */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Availability</h4>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
                style={styles.checkbox}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Catalog Grid Area */}
        <div style={styles.catalogArea}>
          {loading ? (
            /* Loading Skeletons */
            <div className="grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} style={styles.skeletonCard}>
                  <div className="skeleton-loading" style={styles.skeletonImage} />
                  <div className="skeleton-loading" style={styles.skeletonTitle} />
                  <div className="skeleton-loading" style={styles.skeletonPrice} />
                </div>
              ))}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>

              {/* Infinite Scroll Load More Button */}
              {visibleCount < sortedProducts.length && (
                <div style={styles.loadMoreRow}>
                  <button
                    onClick={handleLoadMore}
                    style={styles.loadMoreBtn}
                    className="btn btn-primary"
                  >
                    <RefreshCw size={16} style={{ marginRight: '8px' }} />
                    Load More Products
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Results State */
            <div style={styles.noResultsBox}>
              <Grid size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3>No Matching Garments Found</h3>
              <p>Try adjustments in filter sidebar or query keywords.</p>
              <button
                onClick={handleClearAll}
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal Overlay */}
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
  shopPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
    minHeight: '80vh',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  productCount: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  filterToggleBtn: {
    display: 'none', // Shown on responsive breakpoint
    alignItems: 'center',
    gap: '8px',
    border: '1px solid var(--border-color)',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontWeight: '600',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    borderRadius: 'var(--border-radius-sm)',
    color: 'var(--text-primary)',
  },
  sortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sortLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: '600',
  },
  sortSelect: {
    border: '1px solid var(--border-color)',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  mainLayout: {
    display: 'flex',
    gap: '40px',
  },
  sidebar: {
    width: '280px',
    flexShrink: 0,
    position: 'sticky',
    top: '110px',
    height: 'calc(100vh - 140px)',
    overflowY: 'auto',
    paddingRight: '16px',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  clearAllBtn: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  filterDivider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '16px 0',
  },
  filterSection: {
    marginBottom: '24px',
  },
  filterSectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    marginBottom: '12px',
  },
  sidebarSearch: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '8px 12px',
    backgroundColor: 'var(--bg-secondary)',
  },
  sidebarSearchInput: {
    width: '100%',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
  },
  filterOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    cursor: 'pointer',
  },
  checkbox: {
    accentColor: 'var(--accent-gold)',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '8px',
  },
  priceVal: {
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  rangeSlider: {
    width: '100%',
    accentColor: 'var(--text-primary)',
    cursor: 'pointer',
  },
  sizeOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  sizeBtn: {
    width: '40px',
    height: '40px',
    border: '1px solid var(--border-color)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  colorOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  colorBtn: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    border: '2px solid transparent',
    padding: '1px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'transform 0.15s, border-color 0.15s',
  },
  colorBtnInner: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
  },
  ratingStarsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  ratingStarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'left',
    transition: 'color 0.2s',
  },
  resetRadioBtn: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'var(--color-error)',
    alignSelf: 'flex-start',
    marginTop: '4px',
  },
  catalogArea: {
    flexGrow: 1,
  },
  skeletonCard: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  skeletonImage: {
    width: '100%',
    paddingTop: '125%',
    borderRadius: '2px',
  },
  skeletonTitle: {
    height: '18px',
    width: '80%',
    borderRadius: '2px',
  },
  skeletonPrice: {
    height: '16px',
    width: '40%',
    borderRadius: '2px',
  },
  loadMoreRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '48px',
  },
  loadMoreBtn: {
    padding: '14px 32px',
  },
  noResultsBox: {
    padding: '80px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px dashed var(--border-color)',
    borderRadius: 'var(--border-radius-md)',
  },
};

// Embedded sidebar overrides and loading checks
const css = `
.shop-sidebar::-webkit-scrollbar {
  width: 4px;
}
.shop-sidebar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}
.colorBtn:hover {
  transform: scale(1.1);
}
@media (max-width: 992px) {
  div[style*="mainLayout"] {
    flex-direction: column !important;
  }
  button[style*="filterToggleBtn"] {
    display: flex !important;
  }
  .shop-sidebar {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 300px !important;
    height: 100vh !important;
    background-color: var(--bg-primary) !important;
    z-index: 1010 !important;
    box-shadow: var(--shadow-premium) !important;
    padding: 30px !important;
    overflow-y: auto !important;
    transform: translateX(-100%) !important;
    transition: transform var(--transition-smooth) !important;
  }
  .shop-sidebar.open {
    transform: translateX(0) !important;
  }
  div[style*="catalogArea"] div[class*="grid-cols-3"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 576px) {
  div[style*="catalogArea"] div[class*="grid-cols-3"] {
    grid-template-columns: 1fr !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
