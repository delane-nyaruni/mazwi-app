import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import '../theme/UI-setting/Theme.css';
import { FaSun, FaMoon, FaAngleLeft, FaToggleOn, FaToggleOff } from 'react-icons/fa'
// import addNotification from 'react-push-notification'

  const UserSettings = ({color, icon, text, onClick}) => { 

    const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    const [notificationOn, setNotificationOn] = useState(localStorage.getItem('notificationOn') === 'enabled');
    const navigate = useNavigate();

    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
      useEffect(() => { 
      document.body.classList.toggle('notificationOn', notificationOn); 
      localStorage.setItem('notificationOn', notificationOn ? 'enabled' : 'disabled');
     }, [notificationOn]); 

     const handleClick = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(50); // Vibrate for 100ms
  
  }
}

    // const clickToNotify = () =>{
    //     addNotification({
    //   title: 'Notification Enabled',
    //   message: 'Notification On ',
    //   duration: 4000,
    //   native: true,
    //   onClick:()=>{alert("push noti");}
    // });
    // }
     return (<><br />
     <div className='container'><br />
     <div className='main-title'>
       <Link onClick={() => navigate(-1)}  class="btn btn-succes mt-2 pb-1 new-account-ticket float-ends">
               <FaAngleLeft size={25} /> 
              </Link>
             <br />
                          <h4 class="text-gray-500 mt-2 float-end">Settings</h4>

         </div>
         <br /><br /><br /><br /><br />

      <div className='sidebar-title '>
        </div>

        <ul className='sidebar-list'>
            <li 
                className='sidebar-list-item'>
                <Link  >
                Toggle Theme:<span className='small float-end'>      <Link 
      onClick={() => setDarkMode(!darkMode)
      }>{darkMode ? <FaSun size={25} color='grey' className='btn-effect mt-1'/>  : 
      <FaMoon size={25} color='black'
      className='btn-effect'/>} 
      </Link></span>
                </Link>
            </li>
            <li 
                className='sidebar-list-item'>
                <Link  >
                 Notifications:<span className='small float-end'> <Link 
      onClick={() => {setNotificationOn(!notificationOn)}
      }>{notificationOn ? <FaToggleOn size={30} className='btn-effect' color='green' /> : 
      <FaToggleOff className='btn-effect' onClick={handleClick} size={30} color='red' />} 
      </Link></span>
                </Link>
                <br />
                {/* <Link className='btn-effect' onClick={clickToNotify}>Notification</Link> */}
            </li>

        </ul>
      </div>
    </>
    ); 
        };
export default UserSettings;