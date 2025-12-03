import React, { useEffect, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Check if disclaimer was already accepted
  useEffect(() => {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/pnlat/dashboard'); // previously forgot password route
  };

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <>
      {/* Disclaimer Popup */}
      {showDisclaimer && (
        <div className="disclaimer-overlay">
          <div className="disclaimer-box text-center p-4 bg-white rounded shadow">
            <h5>Disclaimer</h5>
            <p>
              By continuing to use MAZWI, you acknowledge that you understand and agree to the
              terms, conditions, and policies of this platform.
            </p>
            <button
              onClick={handleAcceptDisclaimer}
              className="btn btn-primary mt-3 w-100"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Login Page */}
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <FaKey size={80} style={{ color: 'blue', marginBottom: 20 }} />
        <button
          onClick={handleLoginClick}
          className="btn btn-primary btn-user BR15 btn-block px-5"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
