import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({color, icon, text, onClick}) => {
  return (
    <button onClick={onClick} 
            icon={icon}
            style={{backgroundColor:color}} 
            className="btn">
            {text}
    </button>
  )
}

Button.defaultProps = {
    color:'steelblue',
} 

Button.propTypes = {
    text: PropTypes.string,
   // icon: PropTypes.iconType,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button