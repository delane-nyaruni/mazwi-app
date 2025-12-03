import React, { useEffect, useState } from 'react';

/**
 * SoftPopup Component
 * 
 * Props:
 *  - message: string → Text message to display.
 *  - type: 'success' | 'error' | 'info' (default: 'info')
 *  - icon: ReactNode → Optional icon element, e.g. <FaCheckCircle />
 *  - duration: number → Auto-hide duration in ms (default: 3000)
 *  - onClose: function → Callback after popup hides (optional)
 */
const SoftPopup = ({ message, type = 'info', icon = null, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded-xl px-4 py-3 shadow-lg text-white flex items-center space-x-2 animate-fade-in-down ${bgColors[type]}`}
      style={{
        minWidth: '220px',
        maxWidth: '400px',
        transition: 'all 0.3s ease',
      }}
    >
      {icon && <span className="text-white">{icon}</span>}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default SoftPopup;
