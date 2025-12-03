import axios from 'axios'
import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import { FaAngleLeft, FaCopy, FaPaypal } from 'react-icons/fa';
// import TopHeader from '../ui/TopHeader';
import { BsCopy, BsInfoCircle} from 'react-icons/bs';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const DEFAULT_PAYPAL_LINK = 'https://paypal.me/delaneoncodes@gmail.com'; // replace this

const BitcoinPayment = ({ link = DEFAULT_PAYPAL_LINK }) => {
  const [showPopup, setShowPopup] = useState(false);
 const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
    
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (e) {
      const el = document.createElement('textarea');
      el.value = link;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();

      try {
        document.execCommand('copy');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } catch (err) {
        console.error('Copy failed', err);
        alert('Copy failed — please select and copy the address manually.');
      }
      
    }
  };

//   const handleDownload = () => {
//     const blob = new Blob([link], { type: 'text/plain;charset=utf-8' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'pnlat-bitcoin-address.txt';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//   };

//   const btcUri = `bitcoin:${address}`;

    
    const [values] = useState({
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
  <><br />
   <div onLoad={() => setDarkMode(!darkMode)} className='main-title'>
       <Link onClick={() => navigate(-1)}  class="btn btn-succes ml-3 mt-2 pb-1 new-account-ticket float-start">
               <FaAngleLeft size={25} /> 
              </Link>
             <br />
              <div className='mt-3'>
            <h4 class="text-gray-500 float-end mr-4">PayPal Pay</h4>

        </div>
                          {/* <h4 class="text-gray-500 mt-2 float-end">Bitcoin Pay</h4> */}

         </div>
        {/* <TopHeader /> */}
    {/* <body > */}
        <div class="container">
            <br />
            {/* <div className='main-title'>
                    <Link onClick={() => navigate(-1)} class="btn btn-succes mt-4 pb-1 new-account-tickets-circle float-start">
                    <   FaAngleLeft size={25} /> 
                    </Link>
                        <span class="h4 inline mt-4 text-gray-600 mb-5 ml-1 float-end">Bitcoin Pay</span>

                         <br /> 
                     </div> */}

                    
            <div class="row justify-content-cente">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12 d-none d-lg-block bg-logn-img"></div>
                                <div class="col-lg-12">
                                    <div class="p-">
                                        <div class="text-center mb-1">
                                            {/* <h1 class="h4 text-gray-600 mb-4 float-end">Bitcoin Pay</h1> */}
                                            {/* <h1 class="h4 mt-4 text-gray-600 mb-5 float-end">Bitcoin Pay</h1> */}
                                        <FaPaypal size={65} color='blue' />
                                        </div>
                                        <form class="user" method='post' onSubmit={handleSubmit}>
                                         <h1 className='blue  text-center'>12 Month offer</h1>
                                        
                                         <h4 className='text-center text-gray-500 '>
                      $ <span className=' text-gray-600 '>11</span>
                    </h4>
<br />
 <p className='text-center' style={styles.subtitle}>Send Paypal worth amount to this link</p>
                                       <pre color='blue' className='yellow code mb-5'style={styles.address} aria-label="Bitcoin address ">{link}</pre>

        <div >
                                                     <div class="form-group  mt-5">

  {/* <a href={link} target="_blank" rel="noopener noreferrer" style={{ ...styles.button, ...styles.link }}>
            Open PayPal
          </a> */}

          <Link onClick={handleCopy}aria-label="Copy address"  style={styles.button} class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaCopy size={22} className='mr-3 mt-1 mb-1' />
                Copy Link
            </Link>
          </div>

<div class="form-group">
            <Link to={link} target="_blank" rel="noopener noreferrer"  style={styles.button} class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaPaypal size={22} className='mr-3 mt-1 mb-1' />
               Open PayPal
            </Link>

</div>
         
        </div>
                      
                                       {showPopup && (
        <div className='auto' style={styles.popup}><BsCopy size={15} color='silver'  className='text-center'  /> paypal link copied</div>
      )}
                                        <br />
 <small className='text-center' style={styles.note}>
          <BsInfoCircle color='blue' /> Tip: Click copy address & paste on the browser tab .
        </small>

                                        <br />
                                     
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


{/* <div style={styles.container}>
      <div style={styles.card}>
      

        <pre style={styles.address} aria-label="Bitcoin address">{address}</pre>

        <div style={styles.actions}>
          <button onClick={handleCopy} style={styles.button} aria-label="Copy address">
            Copy address
          </button>


          <button onClick={handleDownload} style={styles.button} aria-label="Download address">
            Download
          </button>
        </div>

      </div>

      {showPopup && (
        <div style={styles.popup}>Copied to clipboard!</div>
      )}
    </div> */}



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

const styles = {
 
  card: {
    width: 480,
    maxWidth: '95%',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
    padding: 24,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: 22,
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    color: '#475569',
  },
  address: {
    userSelect: 'all',
    background: '#0f172a',
    color: '#fff',
    padding: '12px 14px',
    borderRadius: 8,
    overflowX: 'auto',
    fontSize: 14,
    fontFamily: 'Courier New',
    lineHeight: '1.4',
  },
  actions: {
    marginTop: 14,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    display: 'block',
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 12,
  },
//   success:{
//  position: 'fixed',
//   top: 20,
//   left: 50,
//   transform: translateX(-50%),
//   background-color:rgb(8, 229, 100),
//   color: white,
//   padding: 15px,
//   border-radius: 5px,
//   box-shadow: 0 2px 5px rgba(14, 86, 211, 0.2),
//   display: none;
//   z-index: 10 

//   } ,

  popup: {
    position: 'fixed',
    top: 20,
    background: 'rgb(8, 229, 100)',
    color: 'white',
    left:'30%',
    padding: '15px',
    borderRadius: 5,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    fontSize: 14,
  },
};

export default BitcoinPayment