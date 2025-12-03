import axios from 'axios'
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import { FaAngleLeft, FaRegMinusSquare, FaRegSave, FaRegPlusSquare } from 'react-icons/fa';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const AccountBalance = () => {
    
    const [values, setValues] = useState({
        name: '',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${protocol}://${ip_address}:${port_address}/user_register`, values)
        .then(res => {
            if(res.data.Status === 'Success'){
            navigate('/home')
            }else{alert('Err')}
        })
        .catch(err => console.error(err))
    }
  return ( 
  <>
    
    {/* //    <style>
    // .msgError {
    //     position: fixed;
    //     top: 20px;
    //     left: 50%;
    //     transform: translateX(-50%);
    //     background-color: #f44336;
    //     color: white;
    //     padding: 15px;
    //     border-radius: 5px;
    //     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    //     display: none;
    // }
    // .msgSuccess {
    //     position: fixed;
    //     top: 20px;
    //     left: 50%;
    //     transform: translateX(-50%);
    //     background-color: #36f485;
    //     color: white;
    //     padding: 15px;
    //     border-radius: 5px;
    //     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    //     display: none;
    // }
    //     </style> */} 
    {/* <body > */}
        <div class="container">
            <div className='main-title'>
                    <Link onClick={() => navigate(-1)} class="btn btn-succes mt-4 pb-1 new-account-tickets-circle float-ends">
                    <   FaAngleLeft size={25} /> 
                    </Link>
                         <br /> 
                     </div>
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12 d-none d-lg-block bg-logn-img"></div>
                                <div class="col-lg-12">
                                    <div class="p-3">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-600 mb-4 ">Enter Balance</h1>
                                        <FaRegMinusSquare className='mr-5' size={80} style={{color:'red', fill:" 0 0 9px rgb(239, 10, 10)",zIndex:0,
                                        cursor:'pointer'}} />
                                        <FaRegPlusSquare className='ml-5' size={80} style={{color:'green', fill:" 0 0 9px rgb(10, 239, 75)",zIndex:0,
                                            cursor:'pointer'}} />
                                        </div>
                                        <br />
                                        <form class="user" method='post' onSubmit={handleSubmit}>
                                        <div class="form-group">
                                           <span className='text-gray-600'>Last Current Balance: $</span>  45
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, email: e.target.value})} placeholder="Enter New" />
                                        </div>
                                        <br />
                                        <Link  to='/pnldt/dashboard' class="btn btn-primary btn-user btn-block BR15 transparent">
                                            <FaRegSave size={25} className='mr-3' />
                                            Save
                                        </Link>
                                    </form>
                                        {/* {/* <br /> */}
                                        {/* <hr className='visible-hr' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="msgError" id="errorPopup">
                Invalid credentials.
            </div>
            <div class="msgError" id="emptyFields">
                Fill-in infomation.
            </div>
            <div class="msgSuccess" id="successPopup">
                Login success.
            </div>
         
        
        </>
  )
}

export default AccountBalance