import axios from 'axios'
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../../configs/NetworkConfig'
import { FaUserLock, FaLockOpen} from 'react-icons/fa';

const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;
const ForgotPassword = () => {
    const [values, setValues] = useState({
        email:''
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://${ip_address}:${port_address}/user_register`, values)
        .then(res => {
            if(res.data.Status === 'Success'){
            navigate('/home')
            }else{alert('Err')}
        })
        .catch(err => console.error(err))
    }
  return (
    <>
        <div class="container ">
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12 d-none d-lg-block bg-logn-img"></div>
                                <div class="col-lg-12">
                                    <div class="p-3">
                                        <div class="text-center">
                                        <FaUserLock className='FaDna' size={100} style={{color:'blue', zIndex:0,
                                            cursor:'pointer'}} />
                                            <h1 class="h4 text-gray-600 mb-4 ">Password Reset</h1>
                                        </div>
                                        <form class="user" onSubmit={handleSubmit}>
                                        <p class="mb-4 text-center small text-gray-500">Enter your email address below and you will recieve a link to reset your password!</p>
                                        <div class="form-group">
                                            <input type="email" required class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, email: e.target.value})} aria-describedby="emailHelp" placeholder="Email Address" />
                                        </div>
                                        <br />
                                        <button  class="btn btn-google btn-user btn-block BR15 mt-5">
                                            <FaLockOpen size={25} className='mr-3' />
                                            Reset
                                        </button>
                                      
                                    </form>
                                        <br />
                                        <hr className='visible-hr' />
                                        <div class="text-center">
                                        <Link class="small" data-toggle="modal" value='' data-target="#logoutModal" to="/register">Create an Account!</Link>
                                        </div>
                                        <div class="text-center">
                                        <Link class="small" to="/login">Login to Account!</Link>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
  )
}

export default ForgotPassword