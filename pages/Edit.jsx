import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
const Edit = () => {

    const  {id} = useParams();

 
  
    // const loadData = async () => {
    //     const res = await  axios.get('http://192.168.43.12:8081/read/'+ id)
    //     setValues({...values, breed_id: res.data[0].breed_id ,breed_type: res.data[0].breed_type})

    // }
       const [values, setValues] = useState([
        // loadData()
    ])
    useEffect(() => {
       axios.get('http://192.168.43.12:8081/read/'+ id)
      .then(res => {
        console.log(res)
        setValues({...values, breed_id: res.data[0].breed_id ,breed_type: res.data[0].breed_type})
    })
      .catch(err => console.log(err))
    })
    
  
    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        const breedType = document.getElementById('breedType').value;

        axios.put('http://192.168.43.12:8081/update/'+ id, values)
        .then(res => {
            console.log(res);
            if (breedType.trim() !== '') {
                successPopupMsg();// handle gracefully the error messages
            }else{
            errorPopupMsg();
            }

            function successPopupMsg(){
                document.getElementById('successPopup').style.display = 'block';
                setTimeout(function() {
                    document.getElementById('successPopup').style.display = 'none';
                    navigate('/home1');

                }, 2000);
            }
        
            function errorPopupMsg(){
                document.getElementById('errorPopup').style.display = 'block';
                setTimeout(function() {
                    document.getElementById('errorPopup').style.display = 'none';
                }, 3000); // 3 seconds before hiding the error message
            }
            
            successPopupMsg();// handle gracefully the error messages
        })
        .catch(err => console.error(err))
    }
  return (
    <>
    <div className="container bg-gradient-primary main">
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0 header">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image header"></div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h3 text-gray-900 mb-4">Update Breed</h1>
                            </div><br />
                            <form className="user" onSubmit={handleUpdate}>
                                <fieldset>
                                    <legend>Herd Data</legend>
                                    <br/> 
                                    Cattle Tag Number
                                    <input type="text" placeholder="breed id" className="form-control form-control-user" value={values.breed_id}
                                        onChange={e => setValues({...values, breed_id: e.target.value})}/>
                                      <br/>
                                    Breed Type

                                      <input type="text" id='breedType'  placeholder="Enter breed type" value={values.breed_type} className="form-control form-control-user "
                                        onChange={e => setValues({...values, breed_type: e.target.value})}/>                        
                        <br/><br/><br/>
                        <button className="btn btn-primary btn-user btn-block ">Update Breed +</button> 
                       <br/>
                                            <a href="../dashboard.html" className="btn btn-google btn-user btn-block ">
                                    Quit
                                </a>
                                </fieldset>
                            </form>
                            <br/>
                            <hr className='visible-hr' />
                            <div className="text-center">
                                <Link to="/home1" className="small">Remove Existing Breed?</Link>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="msgError" id="emptyFields">
                    Fill-in infomation.
                </div>
                <div className="msgSuccess" id="successPopup">
                    Breed Updated.
                </div>
            </div>
    </>
  )
}

export default Edit