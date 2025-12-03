import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import '../theme/UI-setting/Theme.css';
import { FaAngleLeft} from 'react-icons/fa'
// import addNotification from 'react-push-notification'

  const Support = ({color, icon, text, onClick}) => { 

    const [darkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    const [notificationOn] = useState(localStorage.getItem('notificationOn') === 'enabled');
    const navigate = useNavigate();

    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
      useEffect(() => { 
      document.body.classList.toggle('notificationOn', notificationOn); 
      localStorage.setItem('notificationOn', notificationOn ? 'enabled' : 'disabled');
     }, [notificationOn]); 

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
                          <h4 class="text-gray-500 mt-2 float-end">Support</h4>

         </div>
         <br /><br /><br /><br /><br />

      <div className='sidebar-title '>
        </div>

        <ul className='sidebar-list'>
          
            <li 
                className='sidebar-list-item'>
                <Link  >
                Emergency & Essential Services<span className='small float-end'>      
        <p class="text-gray-600 ">
Police (ZRP):  visit nearest Police Station or <br /> Dial 999  <br />
Fire Brigade: Dial 993 or report to District Hospital <br />
Local Clinic / Hospital: Check community notice board or nearest health facility
<br /><br />

</p>
       </span>
                </Link>
            </li>
            <li 
                className='sidebar-list-item text-gray-600 '>
                 GBV & Health Support<span className='small float-end'> 
      <p class="text-gray-600 ">

Musasa Project: GBV Helpline <br /> 0808 00 333 333 <br />
Adult Rape Clinic: 24-hr Support <br /> 0775 448 522 <br />
Padare Men’s Forum: GBV Counseling <br /> 0712 668 830 <br />
Friendship Bench: Mental Health Support <br /> 0716 119 014 <br />
Family Support Trust: Child Protection & Counseling <br /> 0772 830 721 <br />

</p>
      </span>
                <br />
                {/* <Link className='btn-effect' onClick={clickToNotify}>Notification</Link> */}
            </li>

        </ul>
      </div>
    </>
    ); 
        };
export default Support;