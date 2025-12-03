// import { FaRegFileAlt } from 'react-icons/fa'
// import Theme from '../theme/UI-setting/Theme'
import { BsFillBellFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
// import {  FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';


function Header({OpenSidebar}) {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
  
  
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
    <header className='header shadow' onLoad={() => setDarkMode(!darkMode)}>
        <div className='header-left'>
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
            <BsFillBellFill size={23} className='card_icon btn-effect all-alerts'/>
 
    </header>
  )
}

export default Header