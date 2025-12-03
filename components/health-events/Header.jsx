import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from './Button'
// import { FaHeartbeat } from 'react-icons/fa'

const Header = ({title, onAdd, showAdd}) => {
    // const onClick = () =>{
    //     console.log("Add Button Clicked")
    // }

  const location = useLocation()
  return (
    <header className='header'>

      {/* <FaHeartbeat className='App-logo' size={75} style={{color:'#e63f5d', fill:" 0 0 9px rgb(239, 10, 10)",zIndex:-1,position:'absolute',
                           cursor:'pointer'}} />
        <h1>{title}</h1> */}
      {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'green'} 
      text={showAdd ? 'Close' : 'Add'} 
      onClick={onAdd}/>)
      }
    </header>
  )
}

Header.defaultProps = {
    title:'Health Events',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header