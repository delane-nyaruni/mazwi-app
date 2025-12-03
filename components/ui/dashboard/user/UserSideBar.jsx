import { useState } from 'react'
import { FaUserCircle,  FaTable,FaCog ,FaServer, FaCloud, FaSignOutAlt, FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BsFillEnvelopeFill }  from 'react-icons/bs'
// import { CloseButton } from 'reactstrap'
import Modal from 'react-modal'

Modal.setAppElement('#root')
function UserSideBar({openSidebarToggle, OpenSidebar}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <FaUserCircle size={60} className='icon_header ml-5 btn-effect'/><br /> 
                <span className='manage-acc-btn btn mt-4'>Manage Account</span>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>
            <FaTimes size={25} className='btn-effect' aria-hidden="true" />
                 {/* <CloseButton className='btn-effect' variant='white' />  */}
            </span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item btn-effect'>
            <Link to="">
            <BsFillEnvelopeFill className='icon'/> H
            </Link>
            </li>
            <li className='sidebar-list-item btn-effect'>
            <Link to="">
            <FaTable className='icon'/> Log
            </Link>
            </li>
            <li className='sidebar-list-item btn-effect'>
            <Link to="">
            <FaCog className='icon'/> Settings
            </Link>
            </li>
            <li className='sidebar-list-item btn-effect'>
            <Link to="">
            <FaServer className='icon'/> Server
            </Link>
            </li>
            <li className='sidebar-list-item btn-effect'>
             <Link to="/dfms/entities/system/backup" >
            <FaCloud className='icon'/> Backup
            </Link>
            </li>


            <li  onClick={() => { 
                // OpenSidebar
                setModalIsOpen(true)
                }
            } className='sidebar-list-item btn-effect'>
                <Link to="">
                    <FaSignOutAlt className='icon'/> Quit
                </Link>
            </li>
    <Modal className='four-z-index MT7' isOpen ={modalIsOpen}
     shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    {/* <div class="modalu fades three-z-index" id="logoutModal" tabindex="o-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
        <div class="modal-dialo container">
            <div class="modal-content ">
                <div class="modal-header  ">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button onClick={() => setModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <FaTimes className='btn-effect red' aria-hidden="true" />
                    {/* <CloseButton className='btn-effect' variant='red' /> */}
                        {/* <span aria-hidden="true">X</span> */}
                    </button>
                </div>
                <div class="modal-body">
                     <FaExclamationTriangle size={75} color='yellow' className='mb-0 mt-4' />
                    <p className='small text-gray-600 mt-4 mb-0 '>
                    Select "Logout" below if you are ready to end your current session.
                    </p>
                </div>
                <div class="modal-footer modal-footer-hidden">
                    <Link class="btn btn-danger" to="/login">Logout</Link>
                    <button onClick={() => setModalIsOpen(false)} class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    {/* </div> */}

      {/* <h2>Modal</h2>
      <div>
        <button onClick={() => setModalIsOpen(false)}>Cls</button>
      </div> */}

    </Modal>
        </ul>
    </aside>
  )
}

export default UserSideBar