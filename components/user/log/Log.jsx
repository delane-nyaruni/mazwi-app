import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleLeft} from 'react-icons/fa';
// import { GiLog } from 'react-icons/gi';
// import TopHeader from '../ui/TopHeader';
// import { BsCopy, BsInfoCircle,  BsWallet2,} from 'react-icons/bs';



const DEFAULT_BTC_ADDRESS = '12WS9hoqgeQnJXHmw4D2DV1i7iov7qUmmx'; // replace this

const Log = ({ address = DEFAULT_BTC_ADDRESS }) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
    
  const [publicIp, setPublicIp] = useState("");
   const [country, setCountry] = useState("");
   const [localIp, setLocalIp] = useState("");
   const [browser, setBrowser] = useState("");
   const [device, setDevice] = useState("");
 
   // Get Public IP + Country
   useEffect(() => {
     fetch("https://ipapi.co/json/")
       .then((res) => res.json())
       .then((data) => {
         setPublicIp(data.ip);
         setCountry(data.country_name);
       })
       .catch((err) => console.error("Public IP error:", err));
   }, []);
 
   // Get Local IP
   useEffect(() => {
     const pc = new RTCPeerConnection({ iceServers: [] });
     pc.createDataChannel("");
 
     pc.onicecandidate = (event) => {
       if (event && event.candidate && event.candidate.candidate) {
         const parts = event.candidate.candidate.split(" ");
         const ipAddr = parts[4];
         if (/^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1]))/.test(ipAddr)) {
           setLocalIp(ipAddr);
         }
       }
     };
 
     pc.createOffer()
       .then((offer) => pc.setLocalDescription(offer))
       .catch((err) => console.error("Local IP error:", err));
   }, []);
 
   // Get Browser & Device Info (Raw UA parsing)
   useEffect(() => {
     const ua = navigator.userAgent;
 
     // --- Browser Detection ---
     let browserName = "Unknown";
     let browserVersion = "";
 
     if (/chrome|crios|crmo/i.test(ua) && !/edge|edg/i.test(ua)) {
       browserName = "Chrome";
       browserVersion = ua.match(/Chrome\/([\d.]+)/i)?.[1] || "";
     } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
       browserName = "Safari";
       browserVersion = ua.match(/Version\/([\d.]+)/i)?.[1] || "";
     } else if (/firefox|fxios/i.test(ua)) {
       browserName = "Firefox";
       browserVersion = ua.match(/Firefox\/([\d.]+)/i)?.[1] || "";
     } else if (/edg/i.test(ua)) {
       browserName = "Edge";
       browserVersion = ua.match(/Edg\/([\d.]+)/i)?.[1] || "";
     } else if (/opr\//i.test(ua)) {
       browserName = "Opera";
       browserVersion = ua.match(/OPR\/([\d.]+)/i)?.[1] || "";
     } else if (/msie|trident/i.test(ua)) {
       browserName = "Internet Explorer";
       browserVersion = ua.match(/(?:MSIE |rv:)([\d.]+)/i)?.[1] || "";
     }
 
     // --- Device/OS Detection ---
     let os = "Unknown OS";
     if (/windows nt 10/i.test(ua)) os = "Windows 10";
     else if (/windows nt 11/i.test(ua)) os = "Windows 11";
     else if (/windows nt 6.3/i.test(ua)) os = "Windows 8.1";
     else if (/windows nt 6.2/i.test(ua)) os = "Windows 8";
     else if (/windows nt 6.1/i.test(ua)) os = "Windows 7";
     else if (/mac os x/i.test(ua)) os = "macOS";
     else if (/android/i.test(ua)) os = "Android";
     else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
     else if (/linux/i.test(ua)) os = "Linux";
 
     let deviceType = "Desktop";
     if (/mobile/i.test(ua)) deviceType = "Mobile";
     if (/tablet/i.test(ua)) deviceType = "Tablet";
 
     setBrowser(`${browserName} ${browserVersion}`);
     setDevice(`${os} (${deviceType})`);
   }, []);
 

//   const btcUri = `bitcoin:${address}`;


    const navigate = useNavigate()
  
  return ( 
  <><br />
   <div onLoad={() => setDarkMode(!darkMode)}  className='main-title'>
       <Link onClick={() => navigate(-1)}  class="btn btn-succes ml-3 mt-2 pb-1 new-account-ticket float-start">
               <FaAngleLeft size={25} /> 
              </Link>
             <br />
              <div className='mt-3'>
            <h4 class="text-gray-500 float-end mr-4">Log</h4>

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
                                        {/* <FaT size={65} color='gold' /> */}
                                        </div>
                                        {/* <form class="user" method='post' >
                                         <h1 className='gold  text-center'>12 Month offer</h1>
                                        
                                         <h4 className='text-center text-gray-500 '>
                      $ <span className=' text-gray-600 '>11</span>
                    </h4>
<br />
 <p className='text-center' style={styles.subtitle}>Send BTC worth amount to this address</p>
                                       <pre color='gold' className='gold code mb-5'style={styles.address} aria-label="Bitcoin address ">{address}</pre>

        <div >
                                                     <div class="form-group  mt-5">

          <Link onClick={handleCopy}aria-label="Copy address"  style={styles.button} class="btn btn-primary btn-user btn-block BR15 transparent">
                <FaCopy size={22} className='mr-3 mt-1 mb-1' />
                Copy address
            </Link>
          </div>

<div class="form-group">
      <Link onClick={handleDownload}  aria-label="Download address"  style={styles.button} class="btn btn-primary btn-user btn-block BR15 transparent">
                                            <FaFileDownload size={22} className='mr-3 mt-1 mb-1' />
                                            Download File
                                        </Link>

</div>
         
        </div>
                      
                                       {showPopup && (
        <div className='auto' style={styles.popup}><BsCopy size={15} color='silver'  className='text-center'  /> bitcoin address copied</div>
      )}
                                        <br />
 <small className='text-center' style={styles.note}>
          <BsInfoCircle color='blue' /> Tip: Click copy address & paste the <span class='gold'>BTC</span>  address in your payment wallet <BsWallet2 color='gold' /> .
        </small>

                                        <br />
                                     
                                    </form> */}
                                        {/* {/* <br /> */}
                                        {/* <hr className='visible-hr' /> */}
                                    
                                    
                                     <div class='text-gray-500' style={{ fontFamily: "monospace", textAlign: "center", marginTop: "50px" }}>
      <h4 class='text-gray-600'>Device & Network Info</h4>
      <p class='small'><b>Public IP:</b> {publicIp || "Loading..."}</p>
      <p class='small'><b>Country:</b> {country || "Loading..."}</p>
      <p class='small'><b>Local IP:</b> {localIp || "Detecting..."}</p>
      <p class='small'><b>Browser:</b> {browser || "Detecting..."}</p>
      <p class='small'><b>Device:</b> {device || "Detecting..."}</p>
    </div>
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


export default Log