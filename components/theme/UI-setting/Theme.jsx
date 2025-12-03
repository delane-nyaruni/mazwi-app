import { useState, useEffect } from 'react';
import './Theme.css';
import { FaSun, FaMoon } from 'react-icons/fa'
import { Link } from 'react-router-dom';


  const Theme = ({color, icon, text, onClick}) => { 

    const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]);
     return (
     <>
      <Link 
      onClick={() => setDarkMode(!darkMode)
      }>{darkMode ? <FaSun size={23} color='grey' className='btn-effect'/>  : 
      <FaMoon size={23} color='black' className='btn-effect'/>} 
      </Link>
 
      </>); 
        };
 
export default Theme;