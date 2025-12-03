import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import {   FaAngleLeft, FaCheckCircle, FaExclamationTriangle, FaRegQuestionCircle, FaTicketAlt,  FaTrashAlt } from 'react-icons/fa'
import { Modal } from 'reactstrap'
import { BsCalendar2Date } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;


const ManageTicket = () => { 
     const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
      useEffect(() => { 
        document.body.classList.toggle('dark-mode', darkMode); 
        localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
       }, [darkMode]); 
  
const  {id} = useParams();
const [ ticket, setTicket] = useState([])
const [isLoading, setIsLoading] = useState(true)
  const [breedModalIsOpen, setModalIsOpen] = useState(false)
  // const [breed, setBreed] = useState(null)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

useEffect(() => {
  axios.get(`${protocol}://${ip_address}:${port_address}/api/manage-ticket/read/${id}`)
  .then(res => {
    // console.log(res)
    setTicket(res.data[0])
    setIsLoading(false)
  })
  .catch(err => {
    setError('Failed to fetch ticket details.')
        setIsLoading(false)
  })
}, [id, setTicket])


  const handleDelete = () => {
    axios.delete(`${protocol}://${ip_address}:${port_address}/api/manage-ticket/delete/${id}`)
      .then(() => {
        setSuccessMessage(`ticket #${ticket.ticket_num} deleted .`)
        setTimeout(() => {
          navigate('/pnlat/dashboard')
        }, 2000)
      })
      .catch(() => {
        setError('Failed to delete ticket.')
      })
      .finally(() => {
        setModalIsOpen(false)
      })
  }

return (
  <>
  <br />
  <div class="container " onLoad={() => setDarkMode(!darkMode)}>
    <Link onClick={() => navigate(-1)}  class="btn btn-succes mt-2 pb-1 new-account-ticket float-ends">
            <FaAngleLeft size={25} /> 
            </Link>    

    {isLoading ? (
            <p className="text-gray-500 mt-5">Loading...</p>
          ) : error ? (
            <p className="text-danger mt-5">{error}</p>
          ) : (
            <>
              <div className="car o-hidden borde-0 shadow-l my-1">
                <div className="card-bod p-0">
                  <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-imag"></div>
                    <div className="col-lg-10">
                      <div className="p-3">
                        <div className="text-center">
                          <FaTicketAlt size={75} style={{ color: 'purple', zIndex: 0, cursor: 'pointer' }} />
                          <h1 className="h4 text-gray-600 mb-2 mt-2">Ticket Details</h1>
                        </div>
                        <fieldset>
                          <legend>Ticket #:</legend>
                          <label className="text-gray-500"><FaTicketAlt color='purple' /> Ticket #: {ticket.ticket_num}</label><br />
                          <label className="text-gray-500"><GiMoneyStack color='rgb(20, 218, 129)'/> Profit $: {ticket.profit}</label><br />
                          <label className="text-gray-500"><GiMoneyStack color='red'/> Loss $: {ticket.loss}</label><br />
                          <label className="text-gray-500"><BsCalendar2Date color='rgba(20, 129, 218, 1)'/> Date : {ticket.date}</label>
                        </fieldset>
                        <br /><br />
                        <button onClick={() => setModalIsOpen(true)} className="btn mt-9 btn-danger btn-user btn-block">
                          <FaTrashAlt size={25} className="mr-2" /> Delete
                        </button>
    
    <Modal className='four-z-index MT6 transparent ' isOpen ={breedModalIsOpen}
         shouldCloseOnOverlayClick={false} onLoad={() => setDarkMode(!darkMode)}
        style={{
          overlay:{backgroundColor: '#5e5c5cb7', },
          content:{ overflow: 'auto'}
        }}
        onRequestClose={() => setModalIsOpen(false)}>
    
    {/* <!-- Logout Modal--> */}
        {/* <div class="modalu fades three-z-index" id="logoutModal" tabindex="o-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div class="modal-dialo container re ">
                <div class="modal-content theme-forced-color ">
                    <div class="modal-header transparent ">
                        <h5 class="modal-title text-gray-800" id="exampleModalLabel">Delete Ticket <FaRegQuestionCircle size={15} color='gray'/></h5>
                     
                    </div>
                    <div class="modal-body text-center">
                         <FaExclamationTriangle size={75} color='orange' className='mb-0 mt-4' />
                        <p className='small text-gray-500 mt-4 mb-0 '>
                          Are you sure you want to delete ticket #<span className="text-danger">{ticket.ticket_num}</span> <FaTicketAlt color='purple' />  permanently?
                        </p>
                    </div>
                    <div class="modal-footer modal-footer-hidden">
                          
                        <Link  onClick={handleDelete} class="btn btn-danger" >Delete</Link>
                        <button onClick={() => setModalIsOpen(false)} class="app-btn-def btn btn-darks text-gray-500" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        {/* </div> */}
    
          {/* <h2>Modal</h2>
          <div>
            <button onClick={() => setModalIsOpen(false)}>Cls</button>
          </div> */}
    
        </Modal>
                        {/* <Modal
                          isOpen={breedModalIsOpen}
                          onRequestClose={() => setModalIsOpen(false)}
                          style={{
                            overlay: { backgroundColor: '#5e5c5cb7' },
                            content: { overflow: 'auto' },
                          }}
                        >
                          <div className="modal-content card">
                            <div className="modal-header">
                              <h5 className="modal-title">Delete Ticket?</h5>
                            </div>
                            <div className="modal-body text-center">
                              <FaTrash size={75} color="red" className="mb-0 mt-4" />
                              <p className="small text-gray-600 mt-4 mb-0">
                                Are you sure you want to delete ticket #<span className="text-danger">{ticket.ticket_num}</span> <FaTicketAlt color='purple' />  permanently?
                              </p>
                            </div>
                            <div className="modal-footer">
                              <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                              <button onClick={() => setModalIsOpen(false)} className="btn btn-dark">Cancel</button>
                            </div>
                          </div>
                        </Modal> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {successMessage && (
                <div className="alert alert-success mt-3">
                  <FaCheckCircle size={25} className="mr-2" /> {successMessage}
                </div>
              )}
            </>
          )}



{/* <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0 heade">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image header"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">

 <FaTicketAlt className='FaDn' size={75} style={{color:'purple',zIndex:0,
                           cursor:'pointer'}} /> */}
        {/* <h1>Gene</h1> */}
{/* 
        <br />
                                <h1 class="h4 text-gray-900 mb-4" style={{zIndex:2}}>Ticket Details</h1>
                            </div><br />
                            <form class="user" method="post" id="registerPropertyForm">
                                <fieldset>
                                                  
                                  <br />   
                                  
                                 <fieldset>
                                  <legend>Ticket </legend>
                                    <label>{ticket}</label>
                                  </fieldset>
                                    
                              <br /><br /><br />
                                      <Link to={'/pnlat/dashboard'} className='btn btn-secondary btn-user btn-block '><FaAngleLeft /> Back</Link>

                                      </fieldset>

                              </form>
                            <br />
                            
                            </div>
                            </div>
                        </div>
                    </div>
                </div> */}
</div>

  </>
)
}

export default ManageTicket