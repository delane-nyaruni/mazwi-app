import React, { useEffect, useState } from 'react';

/**
 * Modular popup message for soft success/error/info notifications.
 * Props:
 * - type: 'success' | 'error' | 'info'
 * - message: string (required)
 * - duration: number (milliseconds before auto-hide, default 3000)
 * - icon: React node (optional, e.g. <FaCheck />)
 */
const PopupMsg = ({ type = 'info', message, duration = 3000, icon }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300 ${typeStyles[type]}`}
      style={{ zIndex: 9999 }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
};

export default PopupMsg;
