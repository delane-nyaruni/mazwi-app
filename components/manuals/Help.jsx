import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleLeft} from 'react-icons/fa';
import Help1 from '../../assets/helpimages/Help1.png'
import Help2 from '../../assets/helpimages/Help2.png'
import Help3 from '../../assets/helpimages/Help3.png'
// import TopHeader from '../ui/TopHeader';


const DEFAULT_BTC_ADDRESS = '12WS9hoqgeQnJXHmw4D2DV1i7iov7qUmmx'; // replace this

const Help = ({ address = DEFAULT_BTC_ADDRESS }) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
    


    const navigate = useNavigate()

  return ( 
  <><br />
   <div onLoad={() => setDarkMode(!darkMode)}  className='main-title'>
       <Link onClick={() => navigate(-1)}  class="btn btn-succes ml-3 mt-2 pb-1 new-account-ticket float-start">
               <FaAngleLeft size={25} /> 
              </Link>
             <br />
              <div className='mt-3'>
            <h4 class="text-gray-500 float-end mr-4">Help</h4>

        </div>
                          {/* <h4 class="text-gray-500 mt-2 float-end">Bitcoin Pay</h4> */}

         </div>
        {/* <TopHeader /> */}
    {/* <body > */}
        <div class="container">
            <br />
   
                    
            <div class="row justify-content-cente">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12 d-none d-lg-block bg-logn-img"></div>
                                <div class="col-lg-12">
                                    <div class="p-">
                                        <div class="text-center mb-1">
                                        {/* <GiHelp size={65} color='blue' /> */}
                                        </div>

              <p class='text-gray-500 text-center'>
                                        Click on the Total Balance to hide digital amount

              </p>
                                        <img class='ml-5' src={Help1} height={400} width={195} alt='img 1'/>
                                       <br />
                                        <p class='text-gray-500 text-center'>
                                        Switch theme 

              </p>
                                        <img class='ml-5' src={Help2} height={400} width={195} alt='img 1'/>
                                       <br />
                                        <p class='text-gray-500 text-center'>
                                        modern digital payments access

              </p>
                                        <img class='ml-5' src={Help3} height={400} width={195} alt='img 1'/>
                                       
                                       <br />
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


export default Help