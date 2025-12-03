import UserNavBar from "../ui/dashboard/user/UserNavBar"
import { useState, useEffect } from 'react'
import { FaTable,FaCog ,FaExclamationTriangle, FaRegCopy, FaRegQuestionCircle, FaHandsHelping } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { BsCopy, BsFillEnvelopeFill }  from 'react-icons/bs'
import Modal from 'react-modal'
import { BiSolidHelpCircle } from "react-icons/bi"

Modal.setAppElement('#root')

const UserInfomation = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => { 
    document.body.classList.toggle('dark-mode', darkMode); 
    localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
  }, [darkMode]); 

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("532643167");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (e) {
      try {
        const el = document.createElement('textarea');
        el.value = "532643167";
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        el.remove();

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } catch (err) {
        alert('Copy failed — please select and copy manually.');
      }
    }
  };

  return (
    <>
      <div className='container' onLoad={() => setDarkMode(!darkMode)}>

        {showPopup && (
          <div className='auto' style={styles.popup}>
            <BsCopy size={15} color='silver' className='text-center' />
            {" "}User ID copied successful
          </div>
        )}

        <div className='float-end'>
          <p className='small right font-monospace pt-3 rounded text-gray-600'>
            <code>User ID</code>:
            <span className='btn-effect' onClick={handleCopy} aria-label="Copy address">
              {" "}532643167 <FaRegCopy size={16} onClick={handleCopy} aria-label="Copy address" style={styles.button} className='btn-effect' color="grey" />
            </span>
          </p>
        </div>

        <br /><br /><br />

        {/* MISSING <ul> FIXED */}
       <ul className='sidebar-list mt-5'>
<br /><br /><br /><br /><br /><br /><br />
  <li onClick={() => navigate('/pnlat/mail-message')} className='sidebar-list-item btn-effect'>
    <Link to="" className="">
      <BsFillEnvelopeFill size={28}  className='icon'/> Tsamba
    </Link>
  </li>

  <li onClick={() => navigate('/pnlat/log')} className='sidebar-list-item btn-effect'>
    <Link to="">
      <FaTable size={28}  className='icon'/> Chinyorwa
    </Link>
  </li>

  <li onClick={() => navigate('/pnlat/settings')} className='sidebar-list-item btn-effect'>
    <Link to="/pnlat/settings">
      <FaCog size={28}  className='icon'/> Settings
    </Link>
  </li>

  <li onClick={() => navigate('/mazwi/support')} className='sidebar-list-item btn-effect'>
    <Link to="/mazwi/support">
      <FaHandsHelping size={28}  className='icon'/> RuBatsiro
    </Link>
  </li>

  <li onClick={() => navigate('/mazwi/about')} className='sidebar-list-item btn-effect'>
    <Link to="/mazwi/about">
      <BiSolidHelpCircle size={28} className='icon'/> About
    </Link>
  </li>

</ul>


        <Modal className='four-z-index MT6'
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay:{backgroundColor: '#5e5c5cb7'},
            content:{ overflow: 'auto' }
          }}
          onRequestClose={() => setModalIsOpen(false)}
        >

          <div className="modal-dialo container">
            <div className="modal-content theme-forced-color">
              <div className="modal-header transparent">
                <h5 className="modal-title text-gray-800">
                  Ready to Leave <FaRegQuestionCircle size={15} color='gray'/>
                </h5>
              </div>

              <div className="modal-body text-center">
                <FaExclamationTriangle size={75} color='orange' className='mb-0 mt-4' />
                <p className='small text-gray-500 mt-4 mb-0'>
                  Select "Logout" below if you are ready to end your current session.
                </p>
              </div>

              <div className="modal-footer modal-footer-hidden">
                <Link className="btn btn-danger" to="/login">Logout</Link>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="app-btn-def btn btn-darks text-gray-500"
                  type="button"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </Modal>

        <br /><br /><br />
        <UserNavBar className='mt-5' />

      </div>
    </>
  )
}

const styles = {
  button: { cursor: 'pointer' },
  popup: {
    position: 'fixed',
    top: 20,
    background: 'rgb(8, 229, 100)',
    color: 'white',
    left:'25%',
    padding: '15px',
    borderRadius: 5,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    fontSize: 14,
  },
}

export default UserInfomation
