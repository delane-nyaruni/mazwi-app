import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const ModalWindow = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
    <button onClick={() => setModalIsOpen(true)}>Opn</button>
    <Modal isOpen ={modalIsOpen} shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{color: 'orange', overflow: 'auto'}
    }}
    onRequestClose={() => setModalIsOpen(false)}>
      <h2>Modal</h2>
      <div>
        <button onClick={() => setModalIsOpen(false)}>Cls</button>
      </div>
    </Modal>
        
    </>
  )
}

export default ModalWindow