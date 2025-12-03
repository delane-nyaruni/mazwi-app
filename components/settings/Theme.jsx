import React from 'react'
//import { useLocation } from 'react-router-dom'
//import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import './Theme.css';
import { Button } from '../../health-events/Button'
// import { FaSun, FaMoon } from 'react-icons/fa'

  const Theme = ({color, icon, text, onClick}) => { 

    const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 

     //const location = useLocation()
     return (
     <>
       <h1>Settings</h1><br />
       <h6>Toggle Theme</h6>
      <Button color={darkMode ? 'black' : 'black'} 
      // text={darkMode ? <FaSun />  :  <FaMoon />} 
      onClick={() => setDarkMode(!darkMode)
      }/>
      
      </>); 
        };
      
export default Theme;