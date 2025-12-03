import axios from 'axios'
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../../configs/NetworkConfig'
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const Register = () => {
    
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
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12 d-none d-lg-block bg-logn-img"></div>
                                <div class="col-lg-12">
                                    <div class="p-3">
                                        <div class="text-center">
                                        <FaUserPlus className='FaAuth' size={100} style={{color:'blue', fill:" 0 0 9px rgb(239, 10, 10)",zIndex:0,
                                            cursor:'pointer'}} />
                                            <h1 class="h4 text-gray-600 mb-4 ">Register</h1>
                                        </div>
                                        <form class="user" method='post' onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control BR2 form-control-user textbox-height"
                                            onChange={e => setValues({...values, name: e.target.value})} placeholder="Username" />
                                            
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, email: e.target.value})} aria-describedby="emailHelp" placeholder="Email Address" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control BR2 form-control-user textbox-height"
                                            onChange={e => setValues({...values, password: e.target.value})} id="password" placeholder="Password" />
                                        </div>
                                        {/* <div class="form-group">
                                            <select id="role" name="userType" class="form-control form-control-user">
                                                <option value="student">Student</option>
                                                <option value="landlord">Landlord</option>
                                            </select>
                                        </div> */}
                                        <br />
                                        <button  class="btn btn-primary btn-user btn-block BR15 transparent">
                                            <FaUserCheck size={25} className='mr-3' />
                                            Sign Up
                                        </button>
                                      
                                    </form>
                                        <br />
                                        <hr className='visible-hr' />
                                        <div class="text-center">
                                            <Link class="small" to="/password-reset">Forgot Password? </Link>
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
           
    
            <div class="msgError" id="errorPopup">
                Invalid credentials.
            </div>
            <div class="msgError" id="emptyFields">
                Fill-in infomation.
            </div>
            <div class="msgSuccess" id="successPopup">
                Login success.
            </div>
         
            
        {/* <script>
            function exitSystem() {
                window.close();
            }
    
            document.addEventListener("DOMContentLoaded", function() {
                var rememberedEmail = localStorage.getItem("rememberedEmail");
                if (rememberedEmail) {
                    document.getElementById("username").value = rememberedEmail;
                    document.getElementById("customCheck").checked = true;
                }
            });
    
            document.getElementById("customCheck").addEventListener("change", function() {
                if (this.checked) {
                    localStorage.setItem("rememberedEmail", document.getElementById("username").value);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }
            });
        </script> */}
    
    {/* </body> */}
        </>
  )
}

export default Register