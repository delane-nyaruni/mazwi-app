import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import NET_CONFIG from '../../../../../configs/NetworkConfig'
import { FaDna, FaAngleLeft, FaTrashAlt, FaTrash, FaCheckCircle } from 'react-icons/fa'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const AdminBreedRea = () => { 
    
const [breedModalIsOpen, setModalIsOpen] = useState(false)
const  {id} = useParams();
const [breed, setBreed] = useState([])
const navigate = useNavigate();


useEffect(() => {
  axios.get(`${protocol}://${ip_address}:${port_address}/read/${id}`)
  .then(res => {
    console.log(res)
    setBreed(res.data[0])
  })
  .catch(err => console.log(err))
}, [id])

// useEffect(() => {
//   axios.get(`http://${ip_address}:${port_address}/`)
//   .then(res => setBreed(res.data))
//   .catch(err => console.error(err))
// }, [setBreed])

const handleDelete = (id) => {
  axios.delete(`http://${ip_address}:${port_address}/delete/${id}`)
  .then(res => {
    console.log(res)
    successPopupMsg()
      function successPopupMsg(){
      document.getElementById('successPopup').style.display = 'block';
      setTimeout(function() {
          document.getElementById('successPopup').style.display = 'none';
          navigate('/dfms/entities/user/admin/admin breed view');
      }, 2000);
  }
    
  })
  .catch(err => console.error(err))
}

return (
  <>
  <br />
  <div class="container ">
  <Link to='/dfms/entities/user/admin/admin breed view' className='btn btn-success'><FaAngleLeft size={22}/> Back</Link>

  <div class="car o-hidden border-0 shado-lg my-1">
            <div class="card-body p-0 heade">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-imag heade"></div>
                    <div class="col-lg-10">
                        <div class="p-3">
                            <div class="text-center">

 <FaDna className='FaDna' size={75} style={{color:'white',zIndex:0,
                           cursor:'pointer'}} />
                            {/* fill:" 0 0 9px rgb(239, 10, 10)", */}
        {/* <h1>Gene</h1> */}

        <br />
                                <h1 class="h4 text-gray-900 mb-2 mt-2" style={{zIndex:2}}>View Breed</h1>
                            </div><br />
                            <form class="user" >
                                <fieldset>
                                                  
                                  <br />   
                                  {/* {data.map((breed, breed_id) => {
                        return {breed.breed_id}
                            {breed.breed_type}})} */}
                                 <fieldset>
                                  <legend>Breed Type:</legend>
                                    <label>{breed.breed_type}</label>
                                  </fieldset>
                                    
                              <br className='mb-5' /><br /><br />
                                      <Link onClick={() => setModalIsOpen(true)} className='btn mt-9 btn-danger btn-user btn-block BR15'>
                                      <FaTrashAlt size={25} className=' mr-2' />
                                        Delete 
                                      </Link>

                                      <Modal className='four-z-index container MT7' isOpen ={breedModalIsOpen}
     shouldCloseOnOverlayClick={false}
    style={{
      overlay:{backgroundColor: '#5e5c5cb7'},
      content:{ overflow: 'auto'}
    }}
    onRequestClose={() => setModalIsOpen(false)}>

{/* <!-- Logout Modal--> */}
    {/* <div class="modalu fades three-z-index" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div class="modal-content card B fit-contain ">
                <div class="modal-heade  ">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Breed?</h5>
                    {/* <button onClick={() => setModalIsOpen(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <FaTimes className='btn-effect red' aria-hidden="true" />
                    </button> */}
                </div>
                <div class="modal-body text-center">
                  <FaTrash size={75} color='red' className='mb-0 mt-4 toast-icon-animat' />
                  <p className='small text-gray-600 mt-4 mb-0 '>
                    Are you sure you want to delete the <span className='red'> {breed.breed_type}</span> breed permanetly?. 
                  </p>
                </div>
                <div class="modal-footer modal-footer-hidden mt-0">
                  <button onClick={()=> handleDelete(breed.breed_id)} class="btn btn-danger" >Delete</button>
                  <button onClick={() => setModalIsOpen(false)} class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                </div>
              
            </div>
    


    </Modal>
                                      </fieldset>

                              </form>
                            <br />
                            
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
</div>
      <div className="msgSuccess" id="successPopup">
        <FaCheckCircle size={25} className='mr-2' />
          breed deleted
      </div>
  </>
)
}

export default AdminBreedRea