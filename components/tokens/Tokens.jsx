import { useState, useEffect } from 'react'
import UserNavBar from '../ui/dashboard/user/UserNavBar'
import Modal from 'react-modal'
// import { Link } from 'react-router-dom'
// import { GiToken } from 'react-icons/gi'
// import { FaBitcoin, FaPaypal, FaRegQuestionCircle, FaTimes, FaVideo } from 'react-icons/fa'

Modal.setAppElement('#root')

const Tokens = () => {
     const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 

            //   const [modalIsOpen, setModalIsOpen] = useState(false)


  return (
    <div className='container' onLoad={() => setDarkMode(!darkMode)}>
        <br />
        <div className='main-title mt-3'>
            <h4 class="text-gray-500">Mikana</h4>

        </div>

             <br /><br /><br /><br /><br />

      <div className='sidebar-title '>

        </div>

        <ul className='sidebar-list'>
            {/* <li 
                className='sidebar-list-item'>
                <Link  >
               <span class="text-gray-700">Total Available Coins:</span> 20<span className='small float-ends'>      
                  <Link><GiToken size={23} color='gold' className='btn-effect mt-1'/> 

      </Link></span>
                </Link>
            </li> */}

        </ul>
   
         <br />
            {/* <Link onClick={() => {setModalIsOpen(true)}} class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaVideo size={25} className='mr-3 mt-2 mb-2' />
                Earn
            </Link> */}


{/* <Modal className='four-z-index MT6 ' isOpen ={modalIsOpen}
     shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setModalIsOpen(false)}>

        <div class="modal-dialo container  ">
            <div class="modal-content theme-forced-color ">
                <div class="modal-header transparent ">
                    <h5 class="modal-title text-gray-800" id="exampleModalLabel">Watch & Earn <FaRegQuestionCircle size={15} color='gray'/> </h5>
                    <FaTimes size={25} onClick={() => setModalIsOpen(false)} class=" red " type="button" data-dismiss="modal" />
                </div>
                <div class="modal-body text-center">
                     <FaVideo size={75} color='blue' className='mb-0 mt-4' />
                    <p className='small text-gray-500 mt-4 mb-0 '>
                    watch ads & earn <span className='gold'>2</span> free reward coins <GiToken color='gold'/>.
                    </p>
                </div>
                <div class="modal-footer modal-footer-hidden">
                    <Link class="btn btn-info btn-block" to="*">OK</Link>
                </div>
            </div>
        </div>


    </Modal> */}

            {/* <Link to='/pnlat/payment/paypal' class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaPaypal size={25} className='mr-3 mt-2 mb-2' />
                PayPal
            </Link>
            <Link to='/pnlat/payment/bitcoin' class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaBitcoin size={25} className='mr-3 mt-2 mb-2' />
                Bitcoin
            </Link> */}

    <UserNavBar />
    </div>
  )
}

export default Tokens