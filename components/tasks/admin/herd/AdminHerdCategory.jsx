import React, { useState } from 'react'
import { CloseButton } from 'reactstrap'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

Modal.setAppElement('#root')

const AdminHerdCategory = ({openSidebarToggle, OpenSidebar}) => {
    const [herdModalIsOpen, setHerdModalIsOpen] = useState(false)


  return (
    <>
    
    <Modal className='four-z-index' isOpen ={herdModalIsOpen}
     shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setHerdModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    <div class="modalu fades three-z-index" id="logoutModal" tabindex="o-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content transparentBackgound">
                <div class="modal-header  ">
                    <h5 class="modal-title" id="exampleModalLabel">Herd Category</h5>
                    <button onClick={() => setHerdModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <CloseButton className='btn-effect' variant='red' />
                        {/* <span aria-hidden="true">X</span> */}
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session. Make sure you have saved your data before Logout !!!.</div>
                <div class="modal-footer modal-footer-hidden">
                    <button onClick={() => setHerdModalIsOpen(false)} class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <Link class="btn btn-danger" to="/login">Logout</Link>
                </div>
            </div>
        </div>
    </div>

      {/* <h2>Modal</h2>
      <div>
        <button onClick={() => setModalIsOpen(false)}>Cls</button>
      </div> */}

    </Modal>

    </>
  )
}

export default AdminHerdCategory