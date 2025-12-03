import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../configs/NetworkConfig'
import { FaAngleLeft, FaPlus } from 'react-icons/fa';


const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const SelectAccount = () => {
      const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 

    const [data, setData] = useState([])
        const navigate = useNavigate();

    const [records, setRecords] = useState([]);

    useEffect(() => {
      axios.get(`${protocol}://${ip_address}:${port_address}/api/account-list`)
            .then(res => {
                setData(res.data);
                setRecords(res.data); // Ensure records are initialized with fetched data
            })

            .catch(err => console.error(err));
    }, []);


    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.loss,
            sortable: true,
        },
        {
            name: 'Options',
            cell: row => <Link to={`/pnlat//${row.profit}`}>more..</Link>,
        },
    ];

    const customStyles = {
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 'bolder',
      color: 'blue',
      background: 'rgba(226, 227, 255, 0.955)',
    },
  },
  rows: {
    style: {
      backgroundColor: 'transparent', 
      color: 'rgba(149, 150, 166, 1)'   // <-- makes row background transparent
    },
  },
  table: {
    style: {
      backgroundColor: 'transparent', 
      color: 'rgba(149, 150, 166, 1)'  // <-- makes whole table transparent
    },
  },
  pagination:{
    style: {
      backgroundColor: 'rgba(226, 227, 255, 0.955)', 
      color: 'blue'  // <-- makes whole table transparent
    },
  },
   
};



        const handleChange = (e) => {
        let query = e.target.value.toLowerCase();
        const filteredRecords = data.filter(item =>
            item.id.toString().includes(query) || // Search by ID
            item.ticket_num.toString().includes(query) // Search by breed type
        );
        setRecords(filteredRecords);
    };

  return (
    <>
    <div className='container-fluid mai' onLoad={() => setDarkMode(!darkMode)}>
    <br />

<Link onClick={() => navigate(-1)}  class="btn btn-succes mt-2 pb-1 new-account-ticket float-ends">
            <FaAngleLeft size={25} /> 
            </Link>    
            
            <Link to='/pnlat/open book account' className='btn mt-2 btn-success new-account-ticke float-end'>Create <FaPlus  size={18} /></Link>
    <br />
          <br />
          {/* <!-- DataTales Example --> */}
                <div class="car shado mb-4 ">
                        <div class="card-header glass py-3 dataTable">
                            <h6 class="m-0 font-weight-bold text-primary ">Accounts</h6>
                        </div>
                        <div class="card-bod ">
                            <div className="table-responsiv">
                            {/* <div className="row">
                              <div className="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="dataTable_length">
                                  <label>Show 
                                    <select name="dataTable_length" aria-controls="dataTable" className="custom-select  custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
                                    </select> entries</label>
                                    </div></div>
                                    <div className="col-sm-12 col-md-6"><div id="dataTable_filter" className="dataTables_filter">
                                      <label>Search:
                                        <input type="search" className="form-control glass form-control-sm" placeholder="" aria-controls="dataTable"/>
                                      </label>
                                    </div></div>
                                    </div> */}

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div id="dataTable_length" className="dataTables_length">
                                    <label>
                                          {/* Display the number of filtered records */}
                            <h6 className="text-muted mt-"> Account(s) showing: <span className='font-weight-bold text-primary' >
                            {records.length} </span>  </h6>
 
                                    </label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 float-start">
                                    <div id="dataTable_filter" className="dataTables_filter float-start">
                                     
                                    
                                        <label className='text-gray-500 float-start'>
                                            Search:
                                            <input type="search" placeholder=".eg 0.03" onChange={handleChange} className="form-control float-start form-control-sm" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                          
                            <DataTable
                                columns={columns}
                                pagination
                                customStyles={customStyles}
                                data={records} // Use filtered records instead of original data
                                highlightOnHover
                            />

                            </div>
                        </div>
                    </div>
                    <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
        </div>
    </>
  )
}

export default SelectAccount