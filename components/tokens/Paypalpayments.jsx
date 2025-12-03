// PayPalPayment.jsx
// Simple PayPal link sharing component.
// Replace DEFAULT_PAYPAL_LINK with your own PayPal.me or checkout link.

import React, { useState } from 'react';

const DEFAULT_PAYPAL_LINK = 'https://www.paypal.me/delaneoncodes@gmail.com'; // replace this

export default function PayPalPayment({ link = DEFAULT_PAYPAL_LINK }) {
  const [popup, setPopup] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setPopup(true);
      setTimeout(() => setPopup(false), 2000);
    } catch (err) {
      // fallback if clipboard API not available
      const ta = document.createElement('textarea');
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setPopup(true);
        setTimeout(() => setPopup(false), 2000);
      } catch {
        alert('Copy failed — please copy manually.');
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>PayPal Payment</h1>
        <p style={styles.subtitle}>Send money using this link:</p>

        <pre style={styles.linkBox}>{link}</pre>

        <div style={styles.actions}>
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ ...styles.button, ...styles.link }}>
            Open PayPal
          </a>

          <button onClick={handleCopy} style={styles.button}>
            Copy Link
          </button>
        </div>

        <small style={styles.note}>
          Tip: Replace the placeholder with your real PayPal link.
        </small>
      </div>

      {popup && <div style={styles.popup}>Copied to clipboard!</div>}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f4f6',
    padding: 20,
    boxSizing: 'border-box',
  },
  card: {
    width: 480,
    maxWidth: '95%',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
    padding: 24,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  title: { margin: 0, fontSize: 22, color: '#0f172a' },
  subtitle: { marginTop: 8, marginBottom: 16, color: '#475569' },
  linkBox: {
    userSelect: 'all',
    background: '#0f172a',
    color: '#fff',
    padding: '12px 14px',
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 13,
    overflowX: 'auto',
    textAlign: 'left',
  },
  actions: {
    marginTop: 14,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid rgba(15,23,42,0.08)',
    background: '#fff',
    cursor: 'pointer',
    minWidth: 120,
  },
  link: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: { display: 'block', marginTop: 12, color: '#94a3b8', fontSize: 12 },
  popup: {
    position: 'fixed',
    top: 20,
    right: 20,
    background: '#0f172a',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 6,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    fontSize: 14,
  },
};
