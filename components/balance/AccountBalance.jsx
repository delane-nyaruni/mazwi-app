import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import { FaAngleLeft, FaRegMinusSquare, FaRegSave, FaRegPlusSquare } from 'react-icons/fa';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const AccountBalance = () => {
  const [values, setValues] = useState({
    account_num: 'ACC123456', // simulated account
    ticket_num: '',
    amount: '',
    type: '',
    comment: 'new'
  });

  const navigate = useNavigate();

  // Auto-generate 9-digit ticket number
  useEffect(() => {
    const randomTicket = Math.floor(1000000000 + Math.random() * 9000000000); 
    setValues(v => ({ ...v, ticket_num: randomTicket.toString() }));
  }, []);

  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
  useEffect(() => { 
    document.body.classList.toggle('dark-mode', darkMode); 
    localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
  }, [darkMode]); 

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

    if (!values.amount ) {
      errorPopupMsg('enter valid amount.');
      return;
    } else if (!values.type){
      errorPopupMsg('click loss/profit.');
      return;
    }else{
       successPopupMsg(`ticket saved }`);

          // Redirect after 2s
          setTimeout(() => {
            navigate('/pnlat/dashboard');
          }, 2000);
    }

    const payload = {
      account_num: values.account_num,
      ticket_num: values.ticket_num,
      profit: values.type === 'profit' ? parseFloat(values.amount) : 0.00,
      loss: values.type === 'loss' ? parseFloat(values.amount) : 0.00,
    };

    axios.post(`${protocol}://${ip_address}:${port_address}/api/ticket_entry`, payload)
      .then(res => {
        if (res.data.Status === 'Success') {
          successPopupMsg('Ticket saved!');

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
      <div className="container" onLoad={() => setDarkMode(!darkMode)}>
        <div className='main-title'>
          <Link onClick={() => navigate(-1)} className="btn btn-succes mt-4 pb-1 new-account-tickets-circle float-ends">
            <FaAngleLeft size={25} />
          </Link>
          <br />
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="car formBackgrundUI o-hidden border-0 shadw-lg my-0">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-3">
                      <div className="text-center">
                        <h1 className="h4 text-gray-600 mb-4">Enter Ticket</h1>

                        {/* Loss button */}
                        <FaRegMinusSquare
                          className='mr-5'
                          size={80}
                          style={{
                            color: values.type === 'loss' ? 'darkred' : 'red',
                            cursor: 'pointer'
                          }}
                          onClick={() => setValues({ ...values, type: 'loss' })}
                        />

                        {/* Profit button */}
                        <FaRegPlusSquare
                          className='ml-5'
                          size={80}
                          style={{
                            color: values.type === 'profit' ? 'darkgreen' : 'green',
                            cursor: 'pointer'
                          }}
                          onClick={() => setValues({ ...values, type: 'profit' })}
                        />
                      </div>
                      <br />

                      <form className="user" method='post' onSubmit={handleSubmit}>
                        {/* Display Account Number */}
                        <div className="form-group">
                          <span className="text-gray-600">Account Number: </span>
                          <strong className="text-gray-500">{values.account_num}</strong>
                        </div>

                        {/* Display Ticket Number */}
                        <div className="form-group">
                          <span className="text-gray-600">Ticket Number: </span>
                          <strong className="text-gray-500">{values.ticket_num}</strong>
                        </div>

                        {/* Amount */}
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control BR2 form-control-user textbox-height"
                            placeholder="Enter Amount"
                            value={values.amount}
                            onChange={e => setValues({ ...values, amount: e.target.value })}
                          />
                        </div>

                        <br />
                        <button type="submit" className="btn btn-primary btn-user btn-block BR15 transparent">
                          <FaRegSave size={25} className='mr-3' />
                          Save
                        </button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      

      {/* Popup Messages */}
      <div className="msgError" id="errorPopup" style={{ display: 'none' }}></div>
      <div className="msgSuccess" id="successPopup" style={{ display: 'none' }}></div>
    </>
  );
};

export default AccountBalance;
