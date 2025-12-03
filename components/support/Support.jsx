import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../theme/UI-setting/Theme.css';
import { FaAngleLeft } from 'react-icons/fa';
// Import new icons for services
import { FaShieldHalved, FaFireExtinguisher, FaHeartPulse, FaUserDoctor } from 'react-icons/fa6'; 
import { BiBriefcase } from 'react-icons/bi';
import { TbPhoneCall } from 'react-icons/tb';


const Support = () => {
    const [darkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
    }, [darkMode]);

    // Helper component for a clickable contact entry
    const ContactEntry = ({ icon: Icon, title, details, phoneNumber }) => (
        <div className='d-flex align-items-start mb-3'>
            <div className='me-3 flex-shrink-0'>
                <Icon size={24} className='text-primary' />
            </div>
            <div className='flex-grow-1'>
                <p className='fw-bold mb-0 text-dark'>{title}</p>
                <p className='text-gray-600 mb-0'>{details}</p>

                {/* Check if a phone number is provided to render the clickable link */}
                {phoneNumber ? (
                    // Use the 'tel:' scheme to make it a clickable dial pad link
                    <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className='text-primary text-decoration-none fw-semibold'>
                        Dial : {phoneNumber} <TbPhoneCall size={26} className='ms-1 text-success bg-white rounded shadow-lg' />
                    </a>
                ) : (
                    <p className='text-gray-600 mb-0'>{details}</p>
                )}
            </div>
        </div>
    );


    return (
        <main className='main-container py-4'>
            {/* <div className='containe py-4'> */}

                {/* --- Header & Back Button --- */}
                <div className='main-title d-flex justify-content-between align-items-center mb-4'>
                    <Link onClick={() => navigate(-1)} className="btn btn-sm btn-ligh p-2 new-account-ticket">
                        <FaAngleLeft size={20} />
                    </Link>
                    <h4 className="text-gray-500 my-0">Support</h4>
                </div>
                
                {/* --- Emergency Contacts List --- */}
                <ul className='sidebar-list list-unstyled'>
                    
                    {/* Emergency & Essential Services */}
                    <li className='sidebar-list-item mb-5 p-0 bg-ligh rounde shado'>
                        <h5 className='fw-bold text-primary mb-4 border-bottom pb-2'>
                            Emergency & Essential Services
                        </h5>
                        
                        <div className='text-gray-600'>
                            <ContactEntry 
                                icon={FaShieldHalved} 
                                title='Police (ZRP)' 
                                details='Visit nearest Police Station or ' 
                                phoneNumber='999' 
                            />
                            
                            <ContactEntry 
                                icon={FaFireExtinguisher} 
                                class={'red'}
                                title='Fire Brigade' 
                                details='Report to District Hospital or ' 
                                phoneNumber='993' 
                            />
                            
                            <ContactEntry 
                                icon={FaHeartPulse} 
                                title='Local Clinic / Hospital' 
                                details='Check community notice board or nearest health facility.' 
                                // No standard dial number, so pass details
                            />
                        </div>
                    </li>
                    
                    {/* GBV & Health Support */}
                    <li className='sidebar-list-item p-0 bg-ligh '>
                        <h5 className='fw-bold text-primary mb-4 border-bottom pb-2'>
                            GBV & Health Support
                        </h5>
                        
                        <div className='text-gray-500'>
                            <ContactEntry 
                                icon={FaUserDoctor} 
                                title='Musasa Project (GBV Helpline)' 
                                phoneNumber='0808 00 333 333' 
                            />
                            
                            <ContactEntry 
                                icon={FaUserDoctor} 
                                title='Adult Rape Clinic (24-hr Support)' 
                                phoneNumber='0775 448 522' 
                            />
                             <ContactEntry 
                                icon={FaUserDoctor} 
                                title='Friendship Bench (Mental Health Support)' 
                                phoneNumber='0716 119 014' 
                            />
                            
                            <ContactEntry 
                                icon={FaUserDoctor} 
                                title='Family Support Trust (Child Protection & Counseling)' 
                                phoneNumber='0772 830 721' 
                            />
                            <ContactEntry 
                                icon={BiBriefcase} // Using briefcase as placeholder for counseling/forum
                                title='Padare Men’s Forum (GBV Counseling)' 
                                phoneNumber='0712 668 830' 
                            />
                            
                           
                        </div>
                    </li>

                </ul>
            {/* </div> */}
        </main>
    );
};

export default Support;