import { FaPlusCircle,  FaPlus, FaMicrophone, FaPen, } from 'react-icons/fa'
import { Bar,  Line, } from 'recharts';
import TabTheme from '../../theme/UI-setting/TabTheme';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from "axios";

import Modal from 'react-modal'
import NET_CONFIG from '../../../configs/NetworkConfig';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

Modal.setAppElement('#root')


function UserHomeView({actualBalance}) {
   const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');

   const [showBal, setShowBal] = useState(()=>{
    const storedValue = localStorage.getItem('showBal');
           return storedValue === 'true' || storedValue === null; // Default to showing balance if not set
   });

  //  const [view, setView] = useState(()=>{
  //   const  charts = Bar || Line;
  //          return charts ? Bar : Line; // Default to showing balance if not set
  //  });
   
  //  const charts = Bar || Line;
const [view, setView] = useState(localStorage.getItem('chart') === 'line' || 'bar');
  // // Load saved chart type from localStorage
  useEffect(() => {
    // const chart ? bar || line;
    localStorage.setItem("chart", view ? Bar : Line);
      setView(view);
  }, [view]);
  
     useEffect(() => { 
      localStorage.setItem('showBal', setShowBal.toString());
     }, [showBal]);

 const [ setChartData] = useState([]);
  const [ setBalanceData] = useState([]);
  const [ setAccountsData] = useState([]);

    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
  
     const [modalIsOpen, setModalIsOpen] = useState(false)
          
  useEffect(() => {
    axios.get(`${protocol}://${ip_address}:${port_address}/api/chart-data`)
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Chart Data Error:", err));

    axios.get(`${protocol}://${ip_address}:${port_address}/api/balance-data`)
      .then((res) => setBalanceData(res.data))
      .catch((err) => console.error("Balance Data Error:", err));

    axios.get(`${protocol}://${ip_address}:${port_address}/api/total_accounts`)
    .then((res) => setAccountsData(res.data))
    .catch((err) => console.error("Accounts Data Error:", err));

     axios.get(`${protocol}://${ip_address}:${port_address}/api/total_tickets`)
    .then((res) => setAccountsData(res.data))
    .catch((err) => console.error("Tickets Data Error:", err));


  });


const [ setPieData] = useState([]);

useEffect(() => {
  axios.get(`${protocol}://${ip_address}:${port_address}/api/pie-data`)
    .then((res) => setPieData(res.data))
    .catch((err) => console.error("Pie Data Error:", err));
}, [setPieData]);


// track selected (clicked or hovered)



  return (
    <main className='main-container' onLoad={() => setDarkMode(!darkMode)}>
    <div className='main-title'>
        <h4 class="text-gray-500 containr">Pabhodhi</h4>

          <Link onClick={() => { 
                // OpenSidebar
                setModalIsOpen(true)
                }
            } to="/pnlat/dashboard" class="btn btn-succes  mt-0 pt-0 new-account-tickets float-end"><FaPlus  size={18} /> Nyora </Link>
    </div>

<Modal className='four-z-index MT6 ' isOpen ={modalIsOpen}
     shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    {/* <div class="modalu fades three-z-index" id="logoutModal" tabindex="o-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
        <div class="modal-dialog container  " >
            <div class="modal-content theme-forced-color ">
                <div class="modal-header transparent ">
                    <h5 class="modal-title text-gray-800" id="exampleModalLabel">Gadzira Itsva <FaPlusCircle color='gray'/> </h5>
                    {/* <button onClick={() => setModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    {/* <FaTimes className='btn-effect red' aria-hidden="true" /> */}
                    {/* <CloseButton className='btn-effect' variant='red' /> */}
                        {/* <span aria-hidden="true">X</span> */}
                    {/* </button> */} 
                </div>
                <div class="modal-body text-center">
                     {/* <FaExclamationTriangle size={75} color='orange' className='mb-0 mt-4' /> */}
                    <Link to='/pnlat/message' className='pl-4 pr-4 text-gray-600 p-3 app-btn-de disable mt-4 mb-5 mr-3 btn-effect btn'>
                    <FaPen size={45} width={30} className='ml-3 pr-3' color='purple' /> 
                    <br /> Kunyora
                    </Link>
                    <Link to='/pnlat/audio' className=' pl-4 pr-4 app-btn-de p-3 text-gray-600 mt-4 mb-5 ml-3 btn-effect btn'>
                    <FaMicrophone size={45} color='blue' /> 
                    <br /> Inzwi
                    </Link>
                </div>
                <div class="modal-footer modal-footer-hidden">
                    {/* <Link class="btn btn-danger" to="/login">Logout</Link> */}
                    <button onClick={() => setModalIsOpen(false)} class="app-btn-def auto btn btn-block" type="button" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    {/* </div> */}

      {/* <h2>Modal</h2>
      <div>
        <button onClick={() => setModalIsOpen(false)}>Cls</button>
      </div> */}

    </Modal>
    
    <br />

             <TabTheme onLoad={() => setDarkMode(!darkMode)}/>
</main>
  )
}

export default UserHomeView