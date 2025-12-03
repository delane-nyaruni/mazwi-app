import {React, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaDna, FaPlus } from 'react-icons/fa';
import NET_CONFIG from '../../../../../configs/NetworkConfig';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;
const AdminBreedCreate = () => {
    // const navigate = useNavigate();

    const [values, setValues] = useState({
        breed_type:''
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${protocol}://${ip_address}:${port_address}/breed`,values)
        .then(res => {
            console.log(res);
            alert('registered successful');

//             successPopupMsg();

//       function successPopupMsg(){
//       document.getElementById('successPopup').style.display = 'block';
//       setTimeout(function() {
//           document.getElementById('successPopup').style.display = 'none';
//           navigate('/dfms/entities/user/admin/admin breed view');
//       }, 2000);
//   }
            // alert('registered successful');

            // navigate('/dfms/entities/user/admin/admin breed view');
        })
        .catch(err => console.error(err))
    }

  return (
   <>
   <div className="container bg-gradient-primary main"><br />
   <Link to='/dfms/entities/user/admin/daily' className='btn btn-success '>
   <FaAngleLeft size={25} className='mr-1'/> Back</Link>
           
        <div className="car o-hidden border-0 shado-lg my-1">
            <div className="card-body p-0 heade">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image heade"></div>
                    <div className="col-lg-7">
                        <div className="p-3">
                            <div className="text-center">
                            <FaDna className='FaDna' size={75} style={{color:'white',zIndex:0,
                                cursor:'pointer'}} />
                                <h1 className="h4 text-gray-900 mb-2 mt-2">Create Breeds</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                                <fieldset> Breed Type
                                    <legend></legend>
                                    <br className="pb-9 " />
                                      <input type="text" id='breedType' placeholder="Enter breed type" className="form-control BR2 form-control-user "
                                        onChange={e => setValues({...values, breed_type: e.target.value})}/>                        
                        <br/><br/>
                        <button type='submit' className="btn mt-4 btn-primary btn-user btn-block BR15">
                        <FaPlus size={25} class=' mr-3'/>
                            Register Breed </button> 
                                </fieldset>
                                <hr class='visible-hr mt-4 mb-3' />
                                <div className="text-center">

   <Link to='/dfms/entities/user/admin/daily' className='small'>
    View Saved Breeds?</Link>
    </div>
                            </form>
                           <br />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="msgError" id="emptyFields">
                    Fill-in infomation.
                </div>
                <div className="msgSuccess" id="successPopup">
                    Breed registered.
                </div>
            </div>
   </>
  )
}

export default AdminBreedCreate