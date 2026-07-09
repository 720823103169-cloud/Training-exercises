import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

// Seeded High-Quality Mock Products Data
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Premium Leather Biker Jacket',
    brand: 'Tommy Hilfiger',
    category: 'Jackets',
    originalPrice: 12999,
    discountedPrice: 8999,
    discount: 30,
    rating: 4.8,
    ratingCount: 128,
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    mainImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80',
    description: 'A classic silhouette reimagined with high-end luxury. Handcrafted from premium grade sheepskin leather, this jacket features asymmetrical zipper detailing, snap-down lapels, and adjustable side buckles for a perfect tailored fit.',
    specs: {
      'Material': '100% Genuine Sheepskin Leather',
      'Lining': 'Quilted Polyester Fabric',
      'Closure': 'Heavy duty YKK Zippers',
      'Pockets': '3 Outer zippered pockets, 1 Inner slip pocket'
    },
    reviews: [
      { name: 'Aarav S.', rating: 5, date: '2026-06-15', verified: true, text: 'Absolutely stellar quality. The leather smells premium and fits like a glove.' },
      { name: 'Karan J.', rating: 4, date: '2026-06-28', verified: true, text: 'Fits great, leather is thick but soft. Sleeves are a tiny bit long for me.' }
    ]
  },
  {
    id: 2,
    title: 'Slim Fit Stretch Oxford Shirt',
    brand: 'Calvin Klein',
    category: 'Shirts',
    originalPrice: 4999,
    discountedPrice: 3499,
    discount: 30,
    rating: 4.5,
    ratingCount: 245,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue'],
    mainImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80',
    description: 'Crafted from premium long-staple stretch cotton oxford fabric, this shirt provides clean, sophisticated styling. With its updated slim silhouette, button-down collar, and signature CK branding embroidered on the chest.',
    specs: {
      'Material': '98% Organic Cotton, 2% Elastane',
      'Collar': 'Button-down collar',
      'Fit': 'Modern Slim Fit',
      'Care': 'Machine wash cold'
    },
    reviews: [
      { name: 'Rahul V.', rating: 5, date: '2026-05-10', verified: true, text: 'Very comfortable oxford fabric. The stretch is perfect for long working hours.' }
    ]
  },
  {
    id: 3,
    title: 'Premium Pima Cotton Tee',
    brand: 'Jack & Jones',
    category: 'T-Shirts',
    originalPrice: 1999,
    discountedPrice: 1299,
    discount: 35,
    rating: 4.2,
    ratingCount: 512,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Dark Gray', 'Black', 'Olive Green'],
    mainImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
    description: 'Engineered from luxurious 100% long-staple Pima cotton. Extremely soft to the touch, highly breathable, and pre-shrunk for an everlasting fit. Complete with a stylish rib-knit crewneck.',
    specs: {
      'Material': '100% Premium Pima Cotton',
      'Weave': 'Single Jersey Knit',
      'Neckline': 'Crew Neck',
      'Weight': 'Lightweight 160 GSM'
    },
    reviews: [
      { name: 'Deepak M.', rating: 4, date: '2026-07-02', verified: true, text: 'Super soft material. Definitely holds up well after multiple washes.' }
    ]
  },
  {
    id: 4,
    title: 'Structured Wool Blend Blazer',
    brand: 'Tommy Hilfiger',
    category: 'Blazers',
    originalPrice: 15999,
    discountedPrice: 9999,
    discount: 37,
    rating: 4.7,
    ratingCount: 84,
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy Blue', 'Charcoal'],
    mainImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    description: 'Elevate your tailoring game. This sharp structured blazer features a half-canvas construction, notched lapels, dual rear vents, and refined tortoiseshell buttons. Crafted from lightweight Italian wool-blend fabric.',
    specs: {
      'Material': '60% Wool, 40% Polyester Blend',
      'Lining': 'Viscose Satin Lining',
      'Fit': 'Tailored Fit',
      'Origin': 'Fabric woven in Italy'
    },
    reviews: [
      { name: 'Vikram A.', rating: 5, date: '2026-06-29', verified: true, text: 'The cut is fantastic. Looks exceptionally premium and pairs nicely with khakis.' }
    ]
  },
  {
    id: 5,
    title: 'UltraBoost Primeknit Sneakers',
    brand: 'Adidas',
    category: 'Shoes',
    originalPrice: 17999,
    discountedPrice: 13499,
    discount: 25,
    rating: 4.9,
    ratingCount: 382,
    inStock: true,
    sizes: ['8', '9', '10'],
    colors: ['Triple Black', 'White Gray'],
    mainImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    description: 'Engineered with responsive Boost cushioning and breathable, adaptive Primeknit uppers. The shoe responds to every step, delivering extreme comfort. Continues to be the ultimate daily sneaker.',
    specs: {
      'Upper': 'adidas Primeknit Textile Upper',
      'Midsole': 'Full-length responsive Boost',
      'Outsole': 'Continental™ Rubber Outsole',
      'Eco': 'Primeblue - high-performance recycled material'
    },
    reviews: [
      { name: 'Nikhil R.', rating: 5, date: '2026-06-18', verified: true, text: 'Walking on clouds. The comfort is unmatched. Worth every single rupee.' }
    ]
  },
  {
    id: 6,
    title: 'Gold Accent Chronograph Watch',
    brand: 'Tommy Hilfiger',
    category: 'Watches',
    originalPrice: 14999,
    discountedPrice: 10499,
    discount: 30,
    rating: 4.6,
    ratingCount: 96,
    inStock: true,
    sizes: ['One Size'],
    colors: ['Gold', 'Black'],
    mainImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80',
    description: 'Make a bold statement with this premium chronograph time-piece. Crafted with gold-plated stainless steel, a detailed textured black dial with date window, and a premium double-push deployment clasp.',
    specs: {
      'Case': '44mm Gold-plated Stainless Steel',
      'Movement': 'Quartz Multi-function Chronograph',
      'Water Resistance': '50 Meters (5 ATM)',
      'Strap': 'Gold-plated Stainless Steel Link Bracelet'
    },
    reviews: [
      { name: 'Amit G.', rating: 5, date: '2026-06-05', verified: true, text: 'Beautiful weight, rich gold color that is not too flashy. Highly recommended.' }
    ]
  },
  {
    id: 7,
    title: 'Aviator Gold Frame Sunglasses',
    brand: 'Calvin Klein',
    category: 'Sunglasses',
    originalPrice: 7999,
    discountedPrice: 4999,
    discount: 37,
    rating: 4.4,
    ratingCount: 78,
    inStock: true,
    sizes: ['One Size'],
    colors: ['Gold', 'Black'],
    mainImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    description: 'Classic double-bridged aviators featuring a lightweight polished golden metal frame, gradient dark lenses offering 100% UVA/UVB protection, and adjustable soft silicone nose pads.',
    specs: {
      'Frame': 'High grade Monel Metal',
      'Lenses': 'Polarized Triacetate Cellulose (TAC)',
      'Protection': '100% UV400 Protection',
      'Width': 'Lens 58mm, Bridge 14mm, Temple 140mm'
    },
    reviews: [
      { name: 'Sameer P.', rating: 4, date: '2026-06-20', verified: false, text: 'Look very stylish. Standard aviator fit. Polarization is very effective.' }
    ]
  },
  {
    id: 8,
    title: 'Heritage Leather Duffle Bag',
    brand: 'Tommy Hilfiger',
    category: 'Bags',
    originalPrice: 11999,
    discountedPrice: 7999,
    discount: 33,
    rating: 4.7,
    ratingCount: 54,
    inStock: true,
    sizes: ['One Size'],
    colors: ['Tan Brown', 'Dark Gray'],
    mainImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=80',
    description: 'Perfect for weekend getaways or gym days. Handcrafted from top grain vegetable-tanned leather, it is detailed with signature metal hardware, dynamic striping details, and a detachable padded shoulder strap.',
    specs: {
      'Material': 'Full Grain Cowhide Leather',
      'Dimensions': '52cm x 28cm x 25cm (LxWxH)',
      'Capacity': '36 Litres',
      'Hardware': 'Antiqued Brass Fittings'
    },
    reviews: [
      { name: 'Rohan D.', rating: 5, date: '2026-05-25', verified: true, text: 'Beautiful craftsmanship. Leather patinas beautifully. Fits perfect in aircraft cabins.' }
    ]
  },
  {
    id: 9,
    title: '511 Slim Fit Premium Denim',
    brand: "Levi's",
    category: 'Jeans',
    originalPrice: 4599,
    discountedPrice: 3199,
    discount: 30,
    rating: 4.6,
    ratingCount: 310,
    inStock: true,
    sizes: ['30', '32', '34', '36'],
    colors: ['Dark Indigo', 'Black'],
    mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    description: 'A modern slim with room to move. The 511 Slim Fit Jeans are classic jeans designed with high-quality durable ring-spun cotton and engineered stretch fibers for ease of motion.',
    specs: {
      'Material': '99% Premium Cotton, 1% Elastane',
      'Fit': 'Slim from hip to ankle',
      'Rise': 'Low Rise',
      'Weight': '13.5 oz Denim'
    },
    reviews: [
      { name: 'Arjun K.', rating: 5, date: '2026-05-12', verified: true, text: 'My go-to jeans. Fits perfectly and has the right amount of stretch. Indigo wash looks amazing.' }
    ]
  },
  {
    id: 10,
    title: 'Regular Fit Smart Trousers',
    brand: 'Van Heusen',
    category: 'Trousers',
    originalPrice: 3999,
    discountedPrice: 2499,
    discount: 37,
    rating: 4.3,
    ratingCount: 165,
    inStock: true,
    sizes: ['30', '32', '34', '36'],
    colors: ['Charcoal', 'Khaki'],
    mainImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    description: 'Update your corporate and semi-casual wardrobe with these smart trousers. Styled flat front with standard slash pockets, they feature crease-resistant fabrics and an adjustable expandable waistband.',
    specs: {
      'Material': '70% Polyester, 30% Viscose rayon',
      'Fit': 'Modern Regular Fit',
      'Pockets': '2 Side Slit pockets, 2 Back Button pockets',
      'Finishing': 'Crease-resistant finish'
    },
    reviews: [
      { name: 'Aditya P.', rating: 4, date: '2026-06-30', verified: true, text: 'Nice trousers, very light fabric. Perfect for office wear during summers.' }
    ]
  },
  {
    id: 11,
    title: 'Sportswear Club Fleece Hoodie',
    brand: 'Nike',
    category: 'Hoodies',
    originalPrice: 3499,
    discountedPrice: 2499,
    discount: 28,
    rating: 4.5,
    ratingCount: 412,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Heather Gray', 'Black', 'Navy'],
    mainImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
    description: 'A closet staple, the Nike Sportswear Club Fleece Hoodie combines classic athletic style with soft brushed fleece comfort for an elevated daily look you can wear comfortably all day long.',
    specs: {
      'Material': '80% Cotton, 20% Polyester',
      'Fabric': 'Semi-brushed fleece lining',
      'Details': 'Drawstring hood, Kangaroo pockets',
      'Hem': 'Ribbed hem and cuffs'
    },
    reviews: [
      { name: 'Siddharth S.', rating: 5, date: '2026-07-01', verified: true, text: 'Warm, cozy and fits perfectly. Quality is top-tier as expected of Nike.' }
    ]
  },
  {
    id: 12,
    title: 'Royal Silk Blend Kurta Set',
    brand: 'Allen Solly',
    category: 'Ethnic Wear',
    originalPrice: 6999,
    discountedPrice: 4499,
    discount: 35,
    rating: 4.7,
    ratingCount: 76,
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    colors: ['Royal Blue', 'Gold Cream'],
    mainImage: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=600&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    description: 'Celebrate festivals and weddings in complete luxury. The set includes a rich jacquard textured silk-blend navy/royal blue kurta with Mandarin neck, coupled with comfortable cream churidar pants.',
    specs: {
      'Material': '70% Art Silk, 30% Cotton Blend',
      'Neckline': 'Mandarin collar with gold buttons',
      'Length': 'Knee-length Kurta',
      'Bottom': 'Drawstring Churidar included'
    },
    reviews: [
      { name: 'Pranav B.', rating: 5, date: '2026-06-25', verified: true, text: 'Fit is regular. The silk fabric shines beautifully under evening lights. Got tons of compliments.' }
    ]
  }
];

export const ShopProvider = ({ children }) => {
  // Products
  const [products] = useState(MOCK_PRODUCTS);

  // Cart: Load from localStorage
  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('urban_cart');
    return local ? JSON.parse(local) : [];
  });

  // Wishlist: Load from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('urban_wishlist');
    return local ? JSON.parse(local) : [];
  });

  // Recently Viewed: Load from localStorage
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const local = localStorage.getItem('urban_recently_viewed');
    return local ? JSON.parse(local) : [];
  });

  // Comparison: Load from localStorage
  const [compareList, setCompareList] = useState(() => {
    const local = localStorage.getItem('urban_compare');
    return local ? JSON.parse(local) : [];
  });

  // User State
  const [user, setUser] = useState(() => {
    const local = localStorage.getItem('urban_user');
    return local ? JSON.parse(local) : { name: 'Guest', loggedIn: false, email: '' };
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const local = localStorage.getItem('urban_dark_mode');
    if (local !== null) {
      return JSON.parse(local);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('urban_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('urban_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('urban_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('urban_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('urban_user', JSON.stringify(user));
  }, [user]);

  // Dark Mode hook
  useEffect(() => {
    localStorage.setItem('urban_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast management
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product, quantity = 1, size = '', color = '') => {
    // If multiple sizes or colors exist, ensure they are specified
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'One Size';
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';

    setCart((prev) => {
      // Find if item with same ID, size and color already in cart
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        addToast(`Updated ${product.title} quantity in cart!`, 'success');
        return updated;
      } else {
        addToast(`Added ${product.title} to cart!`, 'success');
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity, size, color) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prev) => {
      const match = prev.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (match) {
        addToast(`Removed ${match.product.title} from cart.`, 'warning');
      }
      return prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const index = prev.indexOf(productId);
      if (index > -1) {
        addToast(`Removed ${product.title} from Wishlist.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Added ${product.title} to Wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  // Comparison Functions
  const toggleCompare = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCompareList((prev) => {
      const index = prev.indexOf(productId);
      if (index > -1) {
        addToast(`Removed ${product.title} from comparison.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 3) {
          addToast('You can compare a maximum of 3 products.', 'warning');
          return prev;
        }
        addToast(`Added ${product.title} to comparison list.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Recently Viewed Functions
  const addRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      // Remove it if already exists so we can move it to the front
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5); // Keep last 5
    });
  };

  // Auth Operations
  const loginUser = (email, password) => {
    // Basic mock logic: accepts anything but simulates premium auth
    const name = email.split('@')[0];
    const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
    const userData = { name: uppercaseName, loggedIn: true, email };
    setUser(userData);
    addToast(`Welcome back, ${uppercaseName}!`, 'success');
    return true;
  };

  const registerUser = (name, email, password) => {
    const userData = { name, loggedIn: true, email };
    setUser(userData);
    addToast(`Account created. Welcome, ${name}!`, 'success');
    return true;
  };

  const logoutUser = () => {
    addToast(`Logged out. Goodbye, ${user.name}!`, 'info');
    setUser({ name: 'Guest', loggedIn: false, email: '' });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        compareList,
        user,
        darkMode,
        toasts,
        setDarkMode,
        addToast,
        removeToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        toggleCompare,
        clearCompare,
        addRecentlyViewed,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
