import React from 'react';
import { BiBriefcase } from 'react-icons/bi';
import { FaAngleLeft } from 'react-icons/fa';
import { FaUsers, FaLightbulb,  FaMessage, FaPencil, FaFireFlameCurved } from 'react-icons/fa6';
import { Link ,useNavigate } from 'react-router-dom';
import Mazwilogo from "../assets/images/MAZWI.png";


function About() {
        const navigate = useNavigate();

    return (
        <main className='main-container py-5'>
             <div className='main-title mb-3'> 
                            <Link onClick={() => navigate(-1)} className="btn btn-succes pb-1 new-account-ticket float-start">
                                <FaAngleLeft size={25} /> 
                            </Link>
                            <h4 className="text-gray-500 mt-1 float-end">About </h4>
                            {/* <div style={{ clear: 'both' }}></div> */}
                        </div>
            <div className='containe'>
                
                {/* --- Header Section --- */}
                <header className='text-center mb-5'>
                    <h1 className='text-primary fw-bold display-4'>
                        Know more on Mazwi 
                        <br />
                              <img width={250} className=" mt-0 mb-2" src={Mazwilogo} alt="Mazwi Logo" />
                        
                        {/* <FaMessage className='ms-3' /> */}
                    </h1>
                    <p className='lead text-muted'>
                        The platform for knowledge connection, sharing opportunities and trending ideas.
                    </p>
                </header>

                <hr className='mb-5'/>

                {/* --- Mission Section --- */}
                <section className='row g-4 mb-5'>
                    <div className='col-md-6'>
                        <h2 className='h4 mb-3'>
                            <FaLightbulb className='me-2 text-warning ' /> <span className='text-primary'>Our Vision</span> 
                        </h2>
                        <p className='text-gray-700'>
                             <b>Mazwi</b> (meaning "words" or "voices" in Shona) is built on the belief that every voice matters. We aim to create a vibrant, inclusive space where users can discuss topics ranging from local news (<b>Chirikupisa</b>) to career opportunities (<b>Mabasa</b>) and everything in between.
                        </p>
                    </div>

                    <div className='col-md-6'>
                        <h2 className='h4 mb-3'>
                            <FaUsers className='me-2 text-info' /><span className='text-primary'> Community Focused</span> 
                        </h2>
                        <p className='text-gray-700'>
                            Our platform puts the community at the center. Through voting on messages, users directly influence which topics become trending, ensuring that the most relevant and important discussions rise to the top of the feed.
                        </p>
                    </div>
                </section>

                <hr className='mb-5'/>

                {/* --- Core Features Section --- */}
                <section className='text-center mb-5'>
                    <h2 className='h4 mb-4 text-secondary'>
                        What You Can Do on Mazwi
                    </h2>
                    <div className='row g-4'>
                        
                        <div className='col-md-4'>
                            <div className='card h-100 p-4 shadow-sm'>
                                <FaPencil size={30} className='gold mx-auto mb-3' />
                                <h5 className='card-title'>Nyora (Write)</h5>
                                <p className='card-text text-gray-600'>
                                    Post messages, share your thoughts, and start new conversations quickly and easily.
                                </p>
                            </div>
                        </div>
                        
                        <div className='col-md-4'>
                            <div className='card h-100 p-4 shadow-sm'>
                                <FaFireFlameCurved size={30} className='text-danger mx-auto mb-3' />
                                <h5 className='card-title'>Chirikupisa (Trend)</h5>
                                <p className='card-text text-gray-600'>
                                    See the top discussions based on community votes and engage with what's hot right now.
                                </p>
                            </div>
                        </div>
                        
                        <div className='col-md-4'>
                            <div className='card h-100 p-4 shadow-sm'>
                                <BiBriefcase size={30} className='text-primary mx-auto mb-3' />
                                <h5 className='card-title'>Mabasa (Jobs)</h5>
                                <p className='card-text text-gray-600'>
                                    Find and post job opportunities relevant to your local and national network.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- Call to Action --- */}
                    <h3 className='h5 mb-3'>Ready to join the conversation?</h3>
                    <Link to="/pnlat/dashboard" className="rounded-full btn btn-primary btn-user btn-block BR15 transparent">
                        Start Posting Now <FaMessage size={25} className='mr-3 mt-1 mb-1'  />
                    </Link>


            </div>
        </main>
    );
}

export default About;