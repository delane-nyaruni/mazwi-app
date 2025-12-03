import React, { useState } from 'react'
import AdminNavBar from '../../ui/dashboard/admin/AdminNavBar'
import { FaTimes, FaRegClipboard as Inventory} from 'react-icons/fa'
import { GiCow, GiGrain, GiMilkCarton} from 'react-icons/gi'
import { TbTruckDelivery as BsTruckFlatbed } from 'react-icons/tb'
import { FaSearch, FaPlus } from 'react-icons/fa'
// import AdminHerdCategory from './herd/AdminHerdCategory'

import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root')

const AdminDaily = () => {
    const [herdModalIsOpen, setHerdModalIsOpen] = useState(false)
    const [dairyModalIsOpen, setDairyModalIsOpen] = useState(false)
    const navigate = useNavigate()

  return (
    <div className='container'>
        <h3 className='text-gray-500 mt-3'>Tasks</h3>  
    <br />

    <div class="row">
        <div class="col-xl-3 col-md-3 mb-3">
            <li onClick={() => setHerdModalIsOpen(true)} class="card borde-left-info  shadow h-100 py-1 btn-effect">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                            <GiCow size={40} />
                        </div>
                        <div class="col mr-2">
                            <h6 class="text-x  font-weight-bold text-gray-600 text-center mb-1">
                                 Herd </h6>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="allStudents"></span></div>
                        </div>
                       
                    </div>
                </div>
            </li>
        </div>

{/* <AdminHerdCategory  isOpen ={herdModalIsOpen} onClose={() => setHerdModalIsOpen(false)} /> */}

<Modal className='four-z-index mt-5' isOpen ={herdModalIsOpen}
     shouldCloseOnOverlayClick={true}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setHerdModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    {/* <div class="modalu fades three-z-index" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div class="modal-conten card BR transparentBackgoun">
                <div class="modal-header  ">
                    <h5 class="modal-title" id="exampleModalLabel">Herd Category</h5>
                    <button onClick={() => setHerdModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <FaTimes className='btn-effect red' aria-hidden="true" />
                    </button>
                </div>
                <div class="modal-body">
                <div class="col-xl-3 col-md-3 mb-5">
                <h6>Cow</h6>

            <button onClick={() => setHerdModalIsOpen(true)} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaSearch size={25} class='read' />
                        </div>
                    </div>
                </div>
            </button>

            <button onClick={() => setHerdModalIsOpen(true)} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaPlus size={25}  class='add'/>
                        </div>
                    </div>
                </div>
            </button>
  </div>
<hr className='visible-hr' />
<div class="col-xl-3 col-md-3 mb-3">
                <h6>Breed</h6>
            <button onClick={() => navigate('/dfms/entities/user/admin/admin breed view')} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaSearch size={25} class='read' />
                        </div>
                    </div>
                </div>
            </button>

            <button onClick={() => navigate('/dfms/entities/user/admin/admin breed create')} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaPlus size={25} class='add'/>
                        </div>
                    </div>
                </div>
            </button>
  </div>

                </div>
              
            </div>
    


    </Modal>

        <div class="col-xl-3 col-md-3 mb-3">
            <div class="card borde-left-info  shadow h-100 py-1 btn-effect">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                            <GiGrain className='feed-icon cow-tag' size={40}/>
                        </div>
                        <div class="col mr-2">
                            <h6 class="text-x  font-weight-bold text-gray-600 text-center mb-1">
                                 Feed </h6>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="allStudents"></span></div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-3 mb-3">
            <li  onClick={() => setDairyModalIsOpen(true)}  class="card borde-left-info  shadow h-100 py-1 btn-effect">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                            <GiMilkCarton className='milk-bottle' size={40}/>

                        </div>
                        <div class="col mr-2">
                            <h6 class="text-x  font-weight-bold text-gray-600 text-center mb-1">
                                 Milk </h6>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="allStudents"></span></div>
                        </div>
                       
                    </div>
                </div>
            </li>
        </div>
        <Modal className='four-z-index mt-5' isOpen ={dairyModalIsOpen}
     shouldCloseOnOverlayClick={true}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7', },
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setDairyModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    {/* <div class="modalu fades three-z-index" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div class="modal-conten card BR transparentBackgoun">
                <div class="modal-header  ">
                    <h5 class="modal-title" id="exampleModalLabel">Dairy Category</h5>
                    <button onClick={() => setDairyModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <FaTimes className='btn-effect red' aria-hidden="true" />
                    </button>
                </div>
                <div class="modal-body">
                <div class="col-xl-3 col-md-3 mb-5">
                <h6>Milk session</h6>

            <button onClick={() => navigate('/dfms/entities/user/admin/admin milk view')}  class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaSearch size={25} class='read' />
                        </div>
                    </div>
                </div>
            </button>

            <button onClick={() => navigate('/dfms/entities/user/admin/admin milk add')} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaPlus size={25}  class='add'/>
                        </div>
                    </div>
                </div>
            </button>
  </div>
<hr className='visible-hr' />
<div class="col-xl-3 col-md-3 mb-3">
                <h6>Milk container</h6>
            <button onClick={() => navigate('/dfms/entities/user/admin/admin breed view')} class="card borde-left-info T360 no-border inline shadow h-100 px-1 py-1 btn-effect">
                <div class="card-body ">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        </div>
                        <div class="col mr-0 m-0">
                            <FaSearch size={25} class='read' />
                        </div>
                    </div>
                </div>
            </button>

          
  </div>

                </div>
              
            </div>
    


    </Modal>
        <div class="col-xl-3 col-md-3 mb-3">
            <div class="card borde-left-info  shadow h-100 py-1 btn-effect">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                            <BsTruckFlatbed className=' truck-icon' size={40}/>
                        </div>
                        <div class="col mr-2">
                            <h6 class="text-x  font-weight-bold text-gray-600 text-center mb-1">
                                Delivery </h6>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="allStudents"></span></div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-3">
            <div class="card borde-left-info shadow h-100 py-1 btn-effect">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                            <Inventory className=' inventory-icon' size={40}/>
                        </div>
                        <div class="col mr-2">
                            <h6 class="text-x  font-weight-bold text-gray-600 text-center mb-1">
                                Inventory </h6>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="allStudents"></span></div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

        
    </div>
   
        <br />
        <br />
        <br />
        <br />
        <br />

    <AdminNavBar />
    </div>
  )
}

export default AdminDaily