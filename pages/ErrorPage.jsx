import { FaAngleLeft, FaExclamationTriangle } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';


const ErrorPage = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
  return (
    <div onLoad={() => setDarkMode(!darkMode)} className="container ">
          <br /><br /><br />
          <div className='text-center MR7'>
          <FaExclamationTriangle size={100} className='center abs' color='red'/>
          </div>
          <h4 class="error blue mx-auto" data-text="404 abs">404</h4>
          <br /><br />
          <h4 class='text-gray-600 text-center'>Page Not Found</h4>
          <p class='text-gray-500 text-center'>Sorry, the page you are looking for does not exist.</p>
          <br />
          <br />
          <br />
          <button onClick={() => navigate(-1)} className='btn pb-2 new-account-tickets btn-block btn-effect'>
            <FaAngleLeft size={25}  className='float-start'/>Back
          </button>

        </div>
  );
};

export default ErrorPage;