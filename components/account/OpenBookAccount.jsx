import axios from 'axios'
import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import { FaAngleLeft, FaBook } from 'react-icons/fa';
import {  BsFolderSymlink } from 'react-icons/bs';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const OpenBookAccount = () => {
    
   const [values, setValues] = useState({
       name: '',
       profit: '',
       account_num: ''
     });

       // Auto-generate 9-digit ticket number
  useEffect(() => {
    const randomAccount = Math.floor(100000000000 + Math.random() * 900000000000); 
    setValues(v => ({ ...v, account_num: randomAccount.toString() }));
  }, []);

    const navigate = useNavigate()
    
      // ---------- Popup Handlers ----------
      const showPopup = (id, msg, duration = 2000) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'block';
        setTimeout(() => {
          el.style.display = 'none';
        }, duration);
      };

      
    
      const successPopupMsg = (msg) => showPopup('successPopup', msg, 2000);
      const errorPopupMsg = (msg) => showPopup('errorPopup', msg, 3000);
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!values.name ) {
          errorPopupMsg('enter valid name.');
          return;
        } else if (!values.profit){
          errorPopupMsg('enter valid amount.');
          return;
        }else{
           successPopupMsg(`account created `);
    
              // Redirect after 2s
              setTimeout(() => {
                navigate('/pnlat/dashboard');
              }, 2000);
        }
    
        const payload = {
          account_num: values.account_num,
          name: values.name,
          profit: values.type === 'profit' ? parseFloat(values.amount) : 0.00,
        };
    
        axios.post(`${protocol}://${ip_address}:${port_address}/api/account_entry`, payload)
          .then(res => {
            if (res.data.Status === 'Success') {
              successPopupMsg('account created ');
    
              // Redirect after 2s
              setTimeout(() => {
                navigate('/pnlat/home');
              }, 2000);
            } else {
              errorPopupMsg('Error saving entry.');
            }
          })
          .catch(() => {
            errorPopupMsg('Server error while saving entry.');
          });
      };



  return ( 
  <>
    

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
                                            <h1 class="h4 text-gray-600 mb-4 ">Open Account</h1>
                                        <FaBook size={45} color='green' />
                                        </div>
                                        <br />
                                        <form class="user" method='post' onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, name: e.target.value})} placeholder="Name: ex. Exness" />
                                        </div>
                                         <div class="form-group">
                                           <span className='text-gray-600'>Initial Balance: $</span> 
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control BR2 form-control-user textbox-height" 
                                            onChange={e => setValues({...values, profit: e.target.value})} placeholder="45" />
                                        </div>
                                        <br />
                                         <div class="form-group">
                                           <span className='text-gray-600'>Account #: </span> 
                                            <strong className="text-gray-500">{values.account_num}</strong>
                                        </div>


                                        <br />
                                        <button type="submit" to='/pnlat/dashboard' class="btn btn-primary btn-user btn-block BR15 transparent">
                                            <BsFolderSymlink size={25} className='mr-3' />
                                            Open
                                        </button>

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

export default OpenBookAccount