import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
import Mazwilogo from "../assets/images/MAZWI.png";
import { FaExclamationTriangle } from "react-icons/fa";

const Loading = () => {
  const [darkMode] = useState(localStorage.getItem("dark-mode") === "enabled");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const navigate = useNavigate();

  // Dark mode setup
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // Splash logic
  useEffect(() => {
    const accepted = localStorage.getItem("mazwi-disclaimer-shown");

    const timer = setTimeout(() => {
      if (!accepted) {
        setShowDisclaimer(true);
      } else {
        navigate("/pnlat/dashboard"); // skip disclaimer next time
        // navigate("/"); // skip disclaimer next time
      }
    }, 4500); // show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleAccept = () => {
    localStorage.setItem("mazwi-disclaimer-shown", "true");
    setShowDisclaimer(false);
      // navigate("/"); // skip disclaimer next time
    navigate("/pnlat/dashboard");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center loadingBody vh-100 position-relative">
      {/* Splash content */}
      <img className="mazwi-logo mt-0 mb-2" src={Mazwilogo} alt="Mazwi Logo" />
      {/* <Footer /> */}

      {/* Disclaimer Overlay */}
      {showDisclaimer && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "#fff",
            zIndex: 1000,
          }}
        >                                 <FaExclamationTriangle size={75} color='orange' className='mb-0 mt-4' />

          <h2 className="mb-3 fw-bold text-light">            
            DISCLAIMER</h2>
          <p className="mb-4" style={{ maxWidth: "500px" }}>
            MAZWI is a safe & anonymous space. <br />
            No personal details or login credentials are required. <br />
            Each time you enter, a random user ID is generated & deleted when you exit. <br />
            Your identity is never stored or shared - your voice remains yours alone.
          </p>
          
                   <button
            onClick={handleAccept}
            className="btn btn-success btn-block px-4 py-2 mt-3"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Loading;
