// BitcoinPayment.jsx
// Simple, dependency-free React component. Copy-paste into your project.
// No external libs required. Replace `DEFAULT_BTC_ADDRESS` with your real BTC address.

import React, { useState } from 'react';

const DEFAULT_BTC_ADDRESS = 'bc1qexampleaddressxxxxxxxxxxxxxxxxxxxxxxxxx'; // replace this

export default function BitcoinPayment({ address = DEFAULT_BTC_ADDRESS }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (e) {
      const el = document.createElement('textarea');
      el.value = address;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } catch (err) {
        console.error('Copy failed', err);
        alert('Copy failed — please select and copy the address manually.');
      }
      document.body.removeChild(el);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([address], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bitcoin-address.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const btcUri = `bitcoin:${address}`;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bitcoin Payment</h1>

        <p style={styles.subtitle}>Send BTC to this address</p>

        <pre style={styles.address} aria-label="Bitcoin address">{address}</pre>

        <div style={styles.actions}>
          <button onClick={handleCopy} style={styles.button} aria-label="Copy address">
            Copy address
          </button>

          <a href={btcUri} style={{ ...styles.button, ...styles.link }}>
            Open in Wallet
          </a>

          <button onClick={handleDownload} style={styles.button} aria-label="Download address">
            Download
          </button>
        </div>

        <small style={styles.note}>
          Tip: Replace the placeholder address with your real BTC address. For QR code support or
          advanced payment metadata (amount, label), I can add a lightweight QR generator or build
          a ready-to-use invoice component.
        </small>
      </div>

      {showPopup && (
        <div style={styles.popup}>Copied to clipboard!</div>
      )}
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
    position: 'relative',
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
  title: {
    margin: 0,
    fontSize: 22,
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    color: '#475569',
  },
  address: {
    userSelect: 'all',
    background: '#0f172a',
    color: '#fff',
    padding: '12px 14px',
    borderRadius: 8,
    overflowX: 'auto',
    fontSize: 13,
    lineHeight: '1.4',
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
  note: {
    display: 'block',
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 12,
  },
  popup: {
    position: 'fixed',
    top: 20,
    right: 20,
    background: ' rgba(53, 194, 64, 0.51)',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 6,
    boxShadow: '0 4px 12px rgba(53, 194, 64, 0.51)',
    zIndex: 1000,
    fontSize: 14,
  },
};
