import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useContext(ShopContext);

  if (toasts.length === 0) return null;

  return (
    <div style={styles.toastContainer}>
      {toasts.map((toast) => {
        const Icon = getIcon(toast.type);
        const typeStyle = getStyleForType(toast.type);

        return (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              ...styles.toastCard,
              borderLeft: `4px solid ${typeStyle.color}`,
            }}
          >
            <div style={{ ...styles.iconWrapper, color: typeStyle.color }}>
              <Icon size={18} />
            </div>
            <div style={styles.messageText}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={styles.closeBtn}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
    case 'error':
      return AlertCircle;
    default:
      return Info;
  }
};

const getStyleForType = (type) => {
  switch (type) {
    case 'success':
      return { color: 'var(--color-success)' };
    case 'warning':
      return { color: 'var(--color-warning)' };
    case 'info':
      return { color: 'var(--accent-gold)' };
    case 'error':
      return { color: 'var(--color-error)' };
    default:
      return { color: 'var(--text-primary)' };
  }
};

const styles = {
  toastContainer: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '380px',
    width: 'calc(100vw - 48px)',
  },
  toastCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 18px',
    borderRadius: 'var(--border-radius-sm)',
    boxShadow: 'var(--shadow-medium)',
    animation: 'slideIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  iconWrapper: {
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  messageText: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
    marginRight: '24px',
    lineHeight: '1.4',
  },
  closeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// Add standard keyframe slide-in
const css = `
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
