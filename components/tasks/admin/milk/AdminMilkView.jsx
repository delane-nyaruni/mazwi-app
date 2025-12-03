import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaPlus } from 'react-icons/fa';
import NET_CONFIG from '../../../../configs/NetworkConfig';

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const AdminMilkView = () => {

    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get(`${protocol}://${ip_address}:${port_address}/`)
            .then(res => {
                setData(res.data);
                setRecords(res.data); // Ensure records are initialized with fetched data
            })
            .catch(err => console.error(err));
    }, []);

    const columns = [
        {
            name: 'Breed ID',
            selector: row => row.breed_id,
            sortable: true,
        },
        {
            name: 'Breed Type',
            selector: row => row.breed_type,
            sortable: true,
        },
        {
            name: 'Options',
            cell: row => <Link to={`/dfms/entities/user/admin/admin breed read/${row.breed_id}`}>more..</Link>,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bolder',
                padding: 0,
                margin: 0,
            },
        },
    };

    const handleChange = (e) => {
        let query = e.target.value.toLowerCase();
        const filteredRecords = data.filter(item =>
            item.breed_id.toString().includes(query) || // Search by ID
            item.breed_type.toLowerCase().includes(query) // Search by breed type
        );
        setRecords(filteredRecords);
    };

    return (
        <>
            <div className='container'>
                <br />
                <Link to='/dfms/entities/user/admin/daily' className='btn btn-success'><FaAngleLeft size={25}/> Back</Link>
                
                <Link to="/dfms/entities/user/admin/admin breed create" class="btn btn-success float-end"><FaPlus  size={18} /> Create </Link>
                <br /><br />

                <div className="car shado mb-4">
                    <div className="card-header glass py-">
                        <h6 className="m-0 font-weight-bold text-primary">Breeds</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div id="dataTable_length" className="dataTables_length">
                                    <label>
                                          {/* Display the number of filtered records */}
                            <h6 className="text-muted mt-"> Breed(s) showing: <span className='font-weight-bold text-primary' >
                            {records.length} </span>  </h6>
 
                                    </label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="dataTables_filter">
                                     
                                    
                                        <label>
                                            Search:
                                            <input type="search" placeholder=".eg holstein" onChange={handleChange} className="form-control form-control-sm" />
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
                    <br />
                </div>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
            <br />
        </>
    );
}

export default AdminMilkView;