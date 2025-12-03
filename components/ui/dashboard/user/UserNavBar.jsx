import React, { useState, useEffect } from 'react'
import '../NavBar.css'
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { BiSearchAlt, BiHome , BiListUl} from 'react-icons/bi';
const tabs = [
  {
    route: '/pnlat/dashboard',
    icon: BiHome,
    label: 'Hanziyi'
  },
  {
    route: '/pnlat/view-jobs',
    icon: BiSearchAlt,
    label: 'Mikana',
    className: ' gold'
  },
  {
    route: '/pnlat/user',
    icon: BiListUl,
    label: 'More'
  }
];

const handleClick = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(50); // Vibrate for 100ms
  }
}

const UserNavBar = () => {
   const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
  
  return (
    <div onLoad={() => setDarkMode(!darkMode)}>
    <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
      <div className="container-fluid">
        
    
      </div>
    </nav>

    <nav className="navbar shadow fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
      <Nav className="w-100">
        <div className="d-flex flex-row justify-content-around w-100">
          {tabs.map((tab, index) => (
            <NavItem key={`tab-${index}`}>
              <NavLink to={tab.route} className="nav-link bottom-nav-link btn-effect" activeClassName="active" onClick={handleClick}>
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  {React.createElement(tab.icon, { size: 40, className: 'mobileNavIcons' })}
                  <div className="bottom-tab-label">{tab.label}</div>
                </div>
              </NavLink>
            </NavItem>
          ))}
        </div>
      </Nav>
    </nav>
  </div>
  )
}
export default UserNavBar