import React, { useState, useEffect } from 'react';
import { FaBook,   FaRankingStar, FaPlus, FaTicket } from 'react-icons/fa6'; // Updated imports
import { GiInfo } from 'react-icons/gi';
import { Bar, Line } from 'recharts';
import TabTheme from '../../theme/UI-setting/TabTheme';
import { Link } from 'react-router-dom';
import axios from "axios";
import Modal from 'react-modal'
import NET_CONFIG from '../../../configs/NetworkConfig';
import { FaFireFlameCurved, FaPencil } from 'react-icons/fa6';
import { BiBriefcase } from 'react-icons/bi';
import { FaTicketAlt } from 'react-icons/fa';

// --- CONFIGURATION ---
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

// JSON Server URL for messages (used for fetching top topics)
// const JSON_SERVER_MESSAGES_URL = `http://${ip_address}:${port_address}/messages`; 
const JSON_SERVER_MESSAGES_URL = `http://192.168.100.12:30050/messages`; 

// --- CONFIGURATION ---

Modal.setAppElement('#root')

function UserHomeView({ actualBalance }) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    const [showBal, setShowBal] = useState(() => {
        const storedValue = localStorage.getItem('showBal');
        return storedValue === 'true' || storedValue === null;
    });

    const [view, setView] = useState(localStorage.getItem('chart') === 'line' || 'bar');
    const [setChartData] = useState([]);
    const [balanceData, setBalanceData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [totalAccModalIsOpenOpen, setTotalAccModalIsOpen] = useState(false);
    const [setPieData] = useState([]);
    
    const [topTopics, setTopTopics] = useState([]); // State for top topics

    // Load saved chart type from localStorage
    useEffect(() => {
        localStorage.setItem("chart", view ? Bar : Line);
        setView(view);
    }, [view]);

    useEffect(() => {
        localStorage.setItem('showBal', setShowBal.toString());
    }, [showBal]);

    useEffect(() => { 
        document.body.classList.toggle('dark-mode', darkMode); 
        localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
    }, [darkMode]); 
    
    
    // --- FETCH BALANCE AND CHART DATA ---
    useEffect(() => {
        axios.get(`http://${ip_address}:${port_address}/api/chart-data`)
            .then((res) => setChartData(res.data))
            .catch((err) => console.error("Chart Data Error:", err));

        axios.get(`http://${ip_address}:${port_address}/api/balance-data`)
            .then((res) => setBalanceData(res.data))
            .catch((err) => console.error("Balance Data Error:", err));

        axios.get(`http://${ip_address}:${port_address}/api/pie-data`)
            .then((res) => setPieData(res.data))
            .catch((err) => console.error("Pie Data Error:", err));
    });
    
    
    // --- FETCH TOP 5 MESSAGES (TRENDING TOPICS) ---
    useEffect(() => {
        const fetchTopTopics = async () => {
            try {
                // Uses JSON Server sorting: ?_sort=votes&_order=desc&_limit=5
                const response = await axios.get(`${JSON_SERVER_MESSAGES_URL}?_sort=votes&_order=desc&_limit=5`);
                setTopTopics(response.data);
            } catch (error) {
                console.error("Error fetching top topics:", error);
            }
        };

        // Fetch initially and then poll every 30 seconds to update the trending list
        fetchTopTopics();
        const interval = setInterval(fetchTopTopics, 30000); 
        return () => clearInterval(interval); // Cleanup interval on component unmount

    }, []); 


    return (
        <main className='main-container' onLoad={() => setDarkMode(!darkMode)}>
            <div className='main-title'>
                <h4 className="text-gray-500">Dashboard</h4>
                <Link to="/pnlat/message" className="btn btn-succes mt-0 pt-0 new-account-tickets float-end"><FaPencil color='gold' size={18} /> Nyora </Link>
            </div>

          
            {/* ------------------------------------- */}
            
            <Modal className='four-z-index MT6 ' isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: { backgroundColor: '#5e5c5cb7', },
                    content: { overflow: 'auto' }
                }}
                onRequestClose={() => setModalIsOpen(false)}>

                {/* */}
                <div className="modal-dialog container" >
                    <div className="modal-content theme-forced-color ">
                        <div className="modal-header transparent ">
                            <h5 className="modal-title text-gray-800" id="exampleModalLabel">Create New <FaPlus color='gray' /> </h5>
                        </div>
                        <div className="modal-body text-center">
                            <Link to='/pnlat/balance' className='pl-4 pr-4 text-gray-600 p-3 app-btn-def disable mt-4 mb-5 mr-3 btn-effect btn'>
                                <FaTicket size={45} width={30} className='ml-3 pr-3' color='purple' /> 
                                <br /> Ticket
                            </Link>
                            <Link to='/pnlat/open book account' className=' pl-4 pr-4 app-btn-def p-3 text-gray-600 mt-4 mb-5 ml-3 btn-effect btn'>
                                <FaBook size={45} color='blue' /> 
                                <br /> Account
                            </Link>
                        </div>
                        <div className="modal-footer modal-footer-hidden">
                            <button onClick={() => setModalIsOpen(false)} className="app-btn-def auto btn btn-block" type="button" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <br />

            <div className="grid grid-cols-2 gap-3 main-cars">
                <Link to='/pnlat/trending-topics/' className='card btn-effect shadow'>
                    <div className='card-inne'>
                        <h6 className="text-gray-500">Chirikupisa</h6>
                        <FaFireFlameCurved color='red' size={40} className='card_icon m-2' />
                    </div>
                    <h3>Hot</h3>
                </Link>

                <Link to='/pnlat/post-jobs/' className='card btn-effect shadow'>
                    <div className='card-inne'>
                        <h6 className="text-gray-500">Mabasa</h6>
                        <BiBriefcase size={40} className='card_icon m-2' />
                    </div>
                    <h3>Jobs</h3>
                </Link>
            </div>

            <Modal className='four-z-index MT6 ' isOpen={totalAccModalIsOpenOpen}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: { backgroundColor: '#5e5c5cb7', },
                    content: { overflow: 'auto' }
                }}
                onRequestClose={() => setTotalAccModalIsOpen(false)}>
                <div className="modal-dialog container" >
                    <div className="modal-content theme-forced-color ">
                        <div className="modal-header transparent ">
                            <h5 className="modal-title text-gray-800" id="exampleModalLabel">Account Details <GiInfo size={17} color='gray' /> </h5>
                        </div>
                        <div className="modal-body text-center">
                            <Link to='/pnlat/select-account' className='text-gray-600 p-3 mt-0 mb-0 btn-effect btn'>
                                <FaBook size={25} color='blue' /> 
                                <br />Total Accounts: 
                                <br />
                                <span className='text-gray-500 '>
                                    2
                                    {balanceData}
                                </span>
                            </Link>
                            <br />
                            <Link to='/pnlat/select-ticket' className='text-gray-600 mt-4 mb-2 btn-effect btn'>
                                <FaTicketAlt size={25} color='purple' /> 
                                <br /> Total Tickets: 
                                <br />
                                <span className='text-gray-500 '>
                                    5
                                </span>
                            </Link>
                        </div>
                        <div className="modal-footer modal-footer-hidden">
                            <button onClick={() => setTotalAccModalIsOpen(false)} className="app-btn-def auto btn btn-block" type="button" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <br />
            <br />
              {/* ------------------------------------- */}
            {/* --- TOP 5 TRENDING TOPICS SLIDER --- */}
            {/* ------------------------------------- */}
            <div className='card p-1 mb-4 mt-3 shado'>
                <h5 className="text-primary mb-3">
                    <FaRankingStar className='me-2' /> Top 5 Trending Topics
                </h5>
                <div className="top-topics-slider">
                    {topTopics.length > 0 ? (
                        <ul className='list-unstyled text-gray-600'>
                            {topTopics.map((topic, index) => (
                                <li key={topic.id} className="mb-2 p-2 border-bottom">
                                    <strong className='me-2 text-danger'>#{index + 1}</strong>
                                    <span className="fw-bold">{topic.text.substring(0, 50)}{topic.text.length > 50 ? '...' : ''}</span> 
                                    <span className='float-end badge bg-primary'>
                                        {topic.votes || 0} Votes
                                    </span>
                                    <small className='d-block text-muted'>by {topic.user}</small>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-muted'>No trending topics yet. Start chatting and voting!</p>
                    )}
                </div>
            </div>
            <br />
            <TabTheme onLoad={() => setDarkMode(!darkMode)}/>
        </main>
    )
}

export default UserHomeView;