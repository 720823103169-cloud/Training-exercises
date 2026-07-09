import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

// Custom social SVG components
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
    <polygon points="10 15 15 12 10 9"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Column 1: Brand Info */}
          <div style={styles.col}>
            <div style={styles.logoWrapper}>
              <span style={styles.logoLogo}>URBAN</span>
              <span style={styles.logoSub}>THREADS</span>
            </div>
            <p style={styles.aboutText}>
              UrbanThreads is a premier contemporary men's fashion destination, curating modern luxury garments and stylish accessories designed to elevate your everyday identity.
            </p>
            <div style={styles.socials}>
              <a href="#" aria-label="Facebook" style={styles.socialIcon}><FacebookIcon /></a>
              <a href="#" aria-label="Instagram" style={styles.socialIcon}><InstagramIcon /></a>
              <a href="#" aria-label="Twitter" style={styles.socialIcon}><TwitterIcon /></a>
              <a href="#" aria-label="Youtube" style={styles.socialIcon}><YoutubeIcon /></a>
            </div>
          </div>

          {/* Column 2: Customer Care */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Customer Care</h4>
            <ul style={styles.links}>
              <li><a href="#" style={styles.link}>Contact Us</a></li>
              <li><a href="#" style={styles.link}>Track Your Order</a></li>
              <li><a href="#" style={styles.link}>FAQs</a></li>
              <li><a href="#" style={styles.link}>Store Locator</a></li>
              <li><a href="#" style={styles.link}>Sizing Guide</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate Policy */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Our Policies</h4>
            <ul style={styles.links}>
              <li><a href="#" style={styles.link}>Shipping Policy</a></li>
              <li><a href="#" style={styles.link}>Return & Exchange Policy</a></li>
              <li><a href="#" style={styles.link}>Privacy Policy</a></li>
              <li><a href="#" style={styles.link}>Terms & Conditions</a></li>
              <li><a href="#" style={styles.link}>Security Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Get In Touch</h4>
            <ul style={styles.contactDetails}>
              <li style={styles.contactItem}>
                <MapPin size={18} style={styles.contactIcon} />
                <span style={styles.contactText}>102 Luxury Galleria, MG Road, Bangalore, India - 560001</span>
              </li>
              <li style={styles.contactItem}>
                <Phone size={18} style={styles.contactIcon} />
                <span style={styles.contactText}>+91 80 4912 3000 (10 AM - 7 PM)</span>
              </li>
              <li style={styles.contactItem}>
                <Mail size={18} style={styles.contactIcon} />
                <span style={styles.contactText}>support@urbanthreads.com</span>
              </li>
              <li style={styles.contactItem}>
                <ShieldCheck size={18} style={styles.contactIcon} />
                <span style={styles.contactText}>100% Genuine Brand Guarantee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <hr style={styles.divider} />

        {/* Lower Footer */}
        <div style={styles.bottomBar}>
          <div style={styles.copyright}>
            © {new Date().getFullYear()} UrbanThreads. Crafted for luxury. All rights reserved.
          </div>
          {/* Payment Badges */}
          <div style={styles.paymentContainer}>
            <span style={styles.paymentLabel}>Secure Payments:</span>
            <div style={styles.paymentMethods}>
              <span style={styles.paymentBadge}>VISA</span>
              <span style={styles.paymentBadge}>MASTERCARD</span>
              <span style={styles.paymentBadge}>UPI</span>
              <span style={styles.paymentBadge}>RUPAY</span>
              <span style={styles.paymentBadge}>NET BANKING</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '60px',
    paddingBottom: '30px',
    transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.2fr',
    gap: '40px',
    marginBottom: '40px',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  logoLogo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  logoSub: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: '300',
    letterSpacing: '0.05em',
    color: 'var(--accent-gold)',
  },
  aboutText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  socials: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-subtle)',
    transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.875rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
    paddingBottom: '8px',
    position: 'relative',
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    transition: 'color var(--transition-fast), padding-left var(--transition-fast)',
  },
  contactDetails: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  contactIcon: {
    color: 'var(--accent-gold)',
    flexShrink: 0,
    marginTop: '2px',
  },
  contactText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '0 0 30px 0',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  copyright: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  paymentContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  paymentLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  paymentMethods: {
    display: 'flex',
    gap: '8px',
  },
  paymentBadge: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    padding: '4px 8px',
    borderRadius: '2px',
    letterSpacing: '0.05em',
  },
};

// Add responsive rules and hover effects in embedded style block
const css = `
@media (max-width: 992px) {
  footer div[style*="grid-template-columns"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 576px) {
  footer div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
  footer div[style*="justify-content: space-between"] {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
}
footer a:hover {
  color: var(--accent-gold) !important;
}
footer a[aria-label]:hover {
  background-color: var(--accent-gold) !important;
  color: #111 !important;
  transform: translateY(-2px);
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
