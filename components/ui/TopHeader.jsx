// import { FaRegFileAlt } from 'react-icons/fa'
// import Theme from '../theme/UI-setting/Theme'
// import { BsFillBellFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
// import {  FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';


function TopHeader({OpenSidebar}) {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
      const navigate = useNavigate()

  useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 

    //  const [showBalance, setShowBalance] = useState(() => {
    //          // Initialize state from local storage or default to true
    //          const storedValue = localStorage.getItem('hideBalance');
    //          return storedValue === 'true' || storedValue === null; // Default to showing balance if not set
    //        });
     
       //    const balance = 17.24; // Example balance
     
          //  useEffect(() => {
          //    // Update local storage whenever showBalance changes
          //    localStorage.setItem('hideBalance', showBalance);
          //  }, [showBalance]);
     
          //  const toggleBalanceVisibility = () => {
          //    setShowBalance(!showBalance);
             
          //  };
      
  return (
    <header className='header shado ' onLoad={() => setDarkMode(!darkMode)}>
        <div className='float-start abs'>
           <Link onClick={() => navigate(-1)} class="btn btn-succes mt- new-account-tickets-circle float-ends">
                    <FaAngleLeft size={25} /> 
                    </Link>
        </div>
        <div className='header-center'>
        </div>
          <div className='header-right'>
           {/* <Link onClick={toggleBalanceVisibility}>
            {showBalance ? <FaRegEyeSlash size={23} className='icon text-gray-600 btn-effect card_icon '
                        />  : 
                        <FaRegEye size={23} className='icon text-gray-600 btn-effect card_icon '
                                      />
                        }
          </Link> */}
            
            {/* popup msg icon */}
        </div>
             <div className='main-title'>

                        <h1 class="h4 mt-5 text-gray-600 mb-5 float-end">Bitcoin Pay</h1>
      </div>
    </header>
  )
}

export default TopHeader