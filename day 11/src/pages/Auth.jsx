import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

// Custom inline SVG Google Icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '10px' }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function Auth() {
  const { user, loginUser, registerUser, addToast } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user.loggedIn) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      let success = false;
      if (isLogin) {
        success = loginUser(email, password);
      } else {
        success = registerUser(name, email, password);
      }

      setLoading(false);
      if (success) {
        // Redirect to homepage or previous state
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
      }
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      registerUser('John Doe', 'john.doe@gmail.com', 'google-auth-pass');
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div style={styles.pageContainer} className="fade-in">
      <div style={styles.authWrapper}>
        {/* Left Side Banner - Premium Fashion Model image */}
        <div style={styles.bannerSide}>
          <div style={styles.overlay} />
          <div style={styles.bannerContent}>
            <span style={styles.bannerTag}>URBANTHREADS ESSENTIALS</span>
            <h2 style={styles.bannerTitle}>Crafting Contemporary Luxury</h2>
            <p style={styles.bannerSubtitle}>
              Join our club to receive member-only drops, private sales, and 15% off your first purchase.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div style={styles.formSide} className="glass-panel">
          {/* Tabs */}
          <div style={styles.tabsContainer}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                ...styles.tabBtn,
                color: isLogin ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottomColor: isLogin ? 'var(--accent-gold)' : 'transparent',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                ...styles.tabBtn,
                color: !isLogin ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottomColor: !isLogin ? 'var(--accent-gold)' : 'transparent',
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.formTitle}>
              {isLogin ? 'Welcome Back To UrbanThreads' : 'Create Your Premium Account'}
            </h3>
            <p style={styles.formSubtitle}>
              {isLogin
                ? 'Please enter your luxury login details below.'
                : 'Fill in your credentials to join our fashion network.'}
            </p>

            {/* Name field (Register only) */}
            {!isLogin && (
              <div className="form-group" style={styles.formGroup}>
                <label className="form-label">Full Name</label>
                <div style={styles.inputWrapper}>
                  <User size={16} style={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    style={styles.formControl}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="form-group" style={styles.formGroup}>
              <label className="form-label">Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  style={styles.formControl}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-group" style={styles.formGroup}>
              <div style={styles.labelRow}>
                <label className="form-label">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => addToast('Password reset link sent to your email!', 'info')}
                    style={styles.forgotBtn}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  style={styles.formControl}
                  required
                />
              </div>
            </div>

            {/* Remember Me checkbox */}
            {isLogin && (
              <div style={styles.rememberRow}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.checkbox}
                  />
                  Remember Me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={styles.submitBtn}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </>
              )}
            </button>

            {/* Google Sign In */}
            <div style={styles.dividerRow}>
              <hr style={styles.divLine} />
              <span style={styles.divText}>OR</span>
              <hr style={styles.divLine} />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={styles.googleBtn}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: 'calc(100vh - var(--header-height) - 100px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: 'var(--bg-primary)',
  },
  authWrapper: {
    display: 'flex',
    width: '100%',
    maxWidth: '960px',
    borderRadius: 'var(--border-radius-sm)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-premium)',
    border: '1px solid var(--border-color)',
  },
  bannerSide: {
    width: '50%',
    backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '48px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(17,17,17,0.9) 20%, rgba(17,17,17,0.3) 100%)',
  },
  bannerContent: {
    position: 'relative',
    color: '#FFFFFF',
    zIndex: 2,
  },
  bannerTag: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--accent-gold)',
  },
  bannerTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '12px 0 16px 0',
    lineHeight: '1.2',
  },
  bannerSubtitle: {
    fontSize: '0.85rem',
    opacity: 0.8,
    lineHeight: '1.5',
  },
  formSide: {
    width: '50%',
    backgroundColor: 'var(--bg-primary)',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '32px',
  },
  tabBtn: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '12px 24px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    marginBottom: '8px',
  },
  formSubtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  formControl: {
    paddingLeft: '44px !important',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  forgotBtn: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  rememberRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  checkbox: {
    accentColor: 'var(--accent-gold)',
  },
  submitBtn: {
    width: '100%',
    height: '46px',
    marginBottom: '24px',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  divLine: {
    flexGrow: 1,
    border: 'none',
    borderTop: '1px solid var(--border-color)',
  },
  divText: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    padding: '0 12px',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '46px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.85rem',
    fontWeight: '600',
    backgroundColor: 'var(--bg-secondary)',
    transition: 'background-color 0.2s, border-color 0.2s',
  },
};

// Embedded styles
const css = `
button[style*="forgotBtn"]:hover {
  text-decoration: underline;
}
button[style*="googleBtn"]:hover {
  background-color: var(--border-color);
}
@media (max-width: 768px) {
  div[style*="authWrapper"] {
    flex-direction: column !important;
  }
  div[style*="bannerSide"] {
    width: 100% !important;
    height: 250px !important;
    padding: 30px !important;
  }
  div[style*="formSide"] {
    width: 100% !important;
    padding: 30px !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
