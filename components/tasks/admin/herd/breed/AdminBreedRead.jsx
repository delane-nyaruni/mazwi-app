import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import NET_CONFIG from '../../../../../configs/NetworkConfig'
import { FaDna, FaAngleLeft, FaTrashAlt, FaTrash, FaCheckCircle } from 'react-icons/fa'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const protocol = NET_CONFIG.CONN_PROTOCOL;
const ip_address = NET_CONFIG.STATIC_IP;
const port_address = NET_CONFIG.PORT_ADDRESS;

const AdminBreedRead = () => {
  const [breedModalIsOpen, setModalIsOpen] = useState(false)
  const { id } = useParams()
  const [breed, setBreed] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  // Fetch breed details on mount
  useEffect(() => {
    axios.get(`${protocol}://${ip_address}:${port_address}/read/${id}`)
      .then(res => {
        setBreed(res.data[0])
        setIsLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch breed details.')
        setIsLoading(false)
      })
  }, [id])

  const handleDelete = () => {
    axios.delete(`${protocol}://${ip_address}:${port_address}/delete/${id}`)
      .then(() => {
        setSuccessMessage('Breed deleted successfully.')
        setTimeout(() => {
          navigate('/dfms/entities/user/admin/admin breed view')
        }, 2000)
      })
      .catch(() => {
        setError('Failed to delete the breed.')
      })
      .finally(() => {
        setModalIsOpen(false)
      })
  }

  return (
    <div className="container">
      <Link to='/dfms/entities/user/admin/admin breed view' className='btn btn-success'>
        <FaAngleLeft size={22} /> Back
      </Link>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <div className="card o-hidden border-0 shadow-lg my-1">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-10">
                  <div className="p-3">
                    <div className="text-center">
                      <FaDna size={75} style={{ color: 'white', zIndex: 0, cursor: 'pointer' }} />
                      <h1 className="h4 text-gray-900 mb-2 mt-2">View Breed</h1>
                    </div>
                    <fieldset>
                      <legend>Breed Type:</legend>
                      <label>{breed.breed_type}</label>
                    </fieldset>

                    <button onClick={() => setModalIsOpen(true)} className="btn mt-9 btn-danger btn-user btn-block">
                      <FaTrashAlt size={25} className="mr-2" /> Delete
                    </button>

                    <Modal
                      isOpen={breedModalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={{
                        overlay: { backgroundColor: '#5e5c5cb7' },
                        content: { overflow: 'auto' },
                      }}
                    >
                      <div className="modal-content card">
                        <div className="modal-header">
                          <h5 className="modal-title">Delete Breed?</h5>
                        </div>
                        <div className="modal-body text-center">
                          <FaTrash size={75} color="red" className="mb-0 mt-4" />
                          <p className="small text-gray-600 mt-4 mb-0">
                            Are you sure you want to delete the <span className="text-danger">{breed.breed_type}</span> breed permanently?
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                          <button onClick={() => setModalIsOpen(false)} className="btn btn-dark">Cancel</button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="alert alert-success mt-3">
              <FaCheckCircle size={25} className="mr-2" /> {successMessage}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminBreedRead