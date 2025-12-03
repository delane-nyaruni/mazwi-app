import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaPlus } from 'react-icons/fa';
import NET_CONFIG from '../../../../configs/NetworkConfig';
import { GiMilkCarton } from 'react-icons/gi';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;
const AdminMilkAdd = () => {
    // const navigate = useNavigate();

    const [values, setValues] = useState({
        breed_type:''
    })
    const [breedOptions, setBreedOptions] = useState({})
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

    useEffect(() =>{
         axios.get(`${protocol}://${ip_address}:${port_address}/breed`,values)
        .then(res => setBreedOptions(res.values))
        .catch(err => console.error(err))
    });


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
                            <GiMilkCarton className='FaDna' size={75} style={{color:'white',zIndex:0,
                                cursor:'pointer'}} />
                                <h1 className="h4 text-gray-900 mb-2 mt-2">Add Milking Record</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                                <fieldset> Breed Type
                                    <legend></legend>
                                    <br className="pb-9 " />
                                        <div class="form-group">
                                            <input type="number" id='breedType' placeholder="cow tag eg. 67" 
                                            className="form-control BR2 form-control-user textbox-height "
                                            onChange={e => setValues({...values, breed_type: e.target.value})}/> 
                                        </div>
                                        <div class="form-group">
                                            <input type="date" id='breedType' placeholder="date milked" 
                                            className="form-control BR2 form-control-user textbox-height "
                                            onChange={e => setValues({...values, breed_type: e.target.value})}/> 
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control BR2 form-control-user textbox-height"
                                            onChange={e => setValues({...values, name: e.target.value})} placeholder="total liters milked" />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, email: e.target.value})}
                                             aria-describedby="emailHelp" placeholder="session" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control BR2 form-control-user textbox-height"
                                            onChange={e => setValues({...values, password: e.target.value})}
                                             id="password" placeholder="container" />
                                        </div>   
                                        <div class="form-group">
                                            <select name="" id="">
                                                {breedOptions.map( breedOption => (
                                                   <breedOption key={breedOption.id} value={breedOption.id}>
                                                    {breedOption.type}
                                                   </breedOption>
                                                )

                                                )}
                                            </select>
                                        </div>                       
                        <br/>
                        <button type='submit' className="btn mt-5 btn-primary btn-user btn-block BR15">
                        <FaPlus size={25} class=' mr-3'/>
                            Add Milk Record </button> 
                                </fieldset>
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

export default AdminMilkAdd