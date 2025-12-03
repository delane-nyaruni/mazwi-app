import React from 'react'

const Toast = () => {
    function errorPopupMsg(){
        document.getElementById('errorPopup').style.display = 'block';
        setTimeout(function() {
            document.getElementById('errorPopup').style.display = 'none';
        }, 3000); // 3 seconds before hiding the error message
    }
    errorPopupMsg()

  return (
    <>
    </>
  )
}

export default Toast