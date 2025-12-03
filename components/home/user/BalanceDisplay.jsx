import React, { useState, useEffect } from 'react';
import NET_CONFIG from '../../../configs/NetworkConfig';
import axios from 'axios';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

function parseBalance(data) {
  if (data == null) return null;

  if (typeof data === 'number') return data;

  if (typeof data === 'string') {
    const n = Number(data);
    if (!isNaN(n)) return n;

    const cleaned = data.replace(/[^0-9.-]+/g, ''); // cleaned numeric
    const n2 = Number(cleaned);
    return isNaN(n2) ? null : n2;
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      const p = parseBalance(item);
      if (p !== null) return p;
    }
    return null;
  }

  if (typeof data === 'object') {
    const keys = [
      'balance', 'total', 'total_balance', 'totalBal', 'sum',
      'amount', 'bal', 'account_balance', 'balance_total', 'totalAmount'
    ];
    for (const k of keys) {
      if (data[k] !== undefined) {
        const p = parseBalance(data[k]);
        if (p !== null) return p;
      }
    }
    for (const val of Object.values(data)) {
      const p = parseBalance(val);
      if (p !== null) return p;
    }
  }

  return null;
}

// Soft error popup handler
function errorPopupMsg(message = 'Network Error.') {
  const popup = document.getElementById('errorPopup');
  if (popup) {
    popup.innerText = message;
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 9000);
  }
}

function BalanceDisplay() {
  const [showBalance, setShowBalance] = useState(() => {
    const stored = localStorage.getItem('showBalance');
    return stored === null ? true : stored === 'true';
  });

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('showBalance', showBalance ? 'true' : 'false');
  }, [showBalance]);

  useEffect(() => {
    let mounted = true;

    const fetchBalance = async () => {
      setLoading(true);
      try {
        const url = `${protocol}://${ip_address}:${port_address}/api/total_bal`;
        const res = await axios.get(url);
        console.log('Balance API response:', res.data);

        const parsed = parseBalance(res.data);
        if (mounted) {
          if (parsed === null) {
            setBalance(null);
          } else {
            setBalance(Number(parsed));
          }
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
        if (mounted) {
          setBalance(null);
          errorPopupMsg(); // Soft error trigger
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBalance();
    const id = setInterval(fetchBalance, 60000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const toggleBalanceVisibility = () => setShowBalance(s => !s);

  return (
    <>
      {loading ? (
        <p className="text-gray-600">$0.00</p>
      ) : showBalance ? (
        <p
          className="text-gray-600 font-bold"
          onClick={toggleBalanceVisibility}
          style={{ cursor: 'pointer' }}
        >
          {balance === null ? '$0.00' : `$${Number(balance).toFixed(2)}`}
        </p>
      ) : (
        <p
          className="text-gray-600 font-bold"
          onClick={toggleBalanceVisibility}
          style={{ cursor: 'pointer' }}
        >
          ********
        </p>
      )}

      {/* Soft error popup container */}
      <div className="msgErrorBal" id="errorPopup" style={{ display: 'none' }}>
        Network Error.
      </div>
    </>
  );
}

export default BalanceDisplay;
