import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NET_CONFIG from '../../../configs/NetworkConfig';

// const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;



const ProfilePic = () => {

     const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 

    const [file, setFile] = useState();
    const handleFile = (e) => {
    setFile(e.target.files[0]);
}

const handleUpload = () =>{
    const formdata = new FormData();
    formdata.append('image', file)
    axios.post(`http://${ip_address}:${port_address}/users_profile`, formdata)
    .then(res => {
        if(res.data.Status === "Success"){
            console.log("Succeded")
        }else{
            console.log("Failed")
        }

    });
     //.catch(err => console.log(err))
}


  return (
    <>
    <div className='container' onLoad={() => setDarkMode(!darkMode)}>
    <div>ProfilePic</div>
    <input type='file' onChange={handleFile} />
    <button onClick={handleUpload}>Upload</button>
    </div>
    </>
  )
}

export default ProfilePic