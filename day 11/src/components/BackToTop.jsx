import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={styles.button}
      aria-label="Back to top"
      className="fade-in"
    >
      <ChevronUp size={20} />
    </button>
  );
}

const styles = {
  button: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 99,
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-medium)',
    cursor: 'pointer',
    transition: 'transform 0.3s var(--transition-fast), background-color var(--transition-fast)',
  },
};

// Add hover scale microinteraction style
const css = `
button[aria-label="Back to top"]:hover {
  transform: translateY(-4px) scale(1.05);
  background-color: var(--accent-gold) !important;
  color: #111 !important;
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
