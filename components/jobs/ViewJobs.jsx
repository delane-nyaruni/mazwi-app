import React, { useState, useEffect, useCallback } from "react";
import { BiBriefcase, BiSearch, BiFilterAlt } from "react-icons/bi";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaGraduationCap } from "react-icons/fa";
import UserNavBar from "../ui/dashboard/user/UserNavBar";

// --- CONFIG ---
// Dedicated DB name for local job posts (Matches PostJobs.jsx)
const DB_NAME = "JobsPostDB"; 
const DB_VERSION = 2; 
const STORE_NAME = "jobsStore";

// --- Custom Filter Logic ---
const filterOptions = {
    'date_desc': { label: 'Date (Newest First)', sort: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
    'date_asc': { label: 'Date (Oldest First)', sort: (a, b) => new Date(a.createdAt) - new Date(b.createdAt) },
    'job_type_asc': { label: 'Job Type (A-Z)', sort: (a, b) => (a.jobType || '').localeCompare(b.jobType || '') },
    'job_type_desc': { label: 'Job Type (Z-A)', sort: (a, b) => (b.jobType || '').localeCompare(a.jobType || '') },
};

// Helper component for job card details
const JobDetailItem = ({ icon: Icon, label, value }) => (
    <div className="d-flex align-items-center">
        {Icon && <Icon className="text-primary me-2" size={16} />}
        <span className="font-weight-bold text-muted me-1">{label}:</span>
        <span className="text-secondary">{value}</span>
    </div>
);

const ViewJobs = () => {
    const [jobsList, setJobsList] = useState([]);
    // Removed: const [showPopupText, setShowPopupText] = useState(""); 
    const [selectedFilterKey, setSelectedFilterKey] = useState('date_desc'); 
    const [searchQuery, setSearchQuery] = useState(''); 

    // ------------------ Popup ------------------
    const showPopup = useCallback((text, type = "error", duration = 2000) => {
        // Clean up previous popups before showing a new one
        const POPUP_CLASS = 'active-app-popup';
        document.querySelectorAll(`.${POPUP_CLASS}`).forEach(el => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });

        const cls = type === "error" ? "msgErrorColor" : "msgSuccessColor";
        // const cls = type === "error" ? "msgError" : "msgSuccess";

        
        const el = document.createElement("div");
        el.className = `alert ${cls} ${POPUP_CLASS} fixed-top shadow-lg text-center mx-auto mt-3`;
        el.style.width = '80%';
        el.style.maxWidth = '400px';
        el.style.zIndex = '1050';
        el.innerText = text;
        
        document.body.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) {
                el.style.transition = 'opacity 0.5s';
                el.style.opacity = '0';
                setTimeout(() => {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    // Removed the call to setShowPopupText("");
                }, 500);
            }
        }, duration);
    }, []); // Removed dependency: setShowPopupText

    // ------------------ IndexedDB Setup ------------------
    const openOrCreateDB = useCallback(() => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                }
            };
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => {
                console.error("IndexedDB Error:", event.target.error);
                reject(event.target.error);
            };
        });
    }, []);

    // ------------------ Fetch jobs from backend ------------------
    const fetchJobs = useCallback(async () => {
        try {
            // NOTE: Replace with your actual backend URL
            const res = await fetch("http://your-backend.com/api/jobs"); 
            if (!res.ok) throw new Error("Failed to fetch jobs");
            const serverJobs = await res.json();
            
            serverJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setJobsList((prev) => {
                const localJobs = prev.filter((j) => j.local); 
                return [...serverJobs, ...localJobs];
            });
        } catch (err) {
            console.error("fetchJobs error:", err);
            showPopup("Could not fetch jobs from server", "error");
        }
    }, [showPopup]);

    // ------------------ Load local jobs ------------------
    const loadLocalJobs = useCallback(async () => {
        try {
            const db = await openOrCreateDB(); 
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const getAllReq = store.getAll();
            
            getAllReq.onsuccess = () => {
                const items = getAllReq.result || [];
                items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setJobsList((prev) => {
                    const serverJobs = prev.filter((j) => !j.local); 
                    const localJobs = items.map((j) => ({ ...j, local: true }));
                    return [...serverJobs, ...localJobs];
                });
            };
            
            tx.oncomplete = () => { try { db.close(); } catch (e) {} };
            tx.onerror = () => {
                showPopup("Could not load local jobs", "error");
                try { db.close(); } catch (e) {}
            };
            
        } catch (err) {
            console.warn("loadLocalJobs error:", err);
        }
    }, [openOrCreateDB, showPopup]);

    // ------------------ Initial Load Effect ------------------
    useEffect(() => {
        fetchJobs();
        loadLocalJobs();
    }, [fetchJobs, loadLocalJobs]);

    // ------------------ Filter and Sort Jobs ------------------
    const getFilteredJobs = useCallback(() => {
        const sortFunction = filterOptions[selectedFilterKey]?.sort;
        const query = searchQuery.toLowerCase();
 
        const searchedJobs = jobsList.filter(job => 
            (job.jobType && job.jobType.toLowerCase().includes(query)) ||
            (job.title && job.title.toLowerCase().includes(query)) ||
            (job.location && job.location.toLowerCase().includes(query))
        );

        const sortedJobs = [...searchedJobs].sort(sortFunction);
        
        return sortedJobs;
    }, [jobsList, selectedFilterKey, searchQuery]);

    const filteredJobs = getFilteredJobs();

    // Helper function to format salary
    const formatSalary = (salary) => {
        const numSalary = Number(salary);
        if (isNaN(numSalary) || numSalary <= 0) return 'Negotiable / N/A';
        return `$${numSalary.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    return (
        <div className="min-vh-100 bg-ligh pb-5">

             <br />
         <div className='main-title '>
{/*              <Lin onClick={() => navigate(-1)}  class="btn btn-succes ml-2 mt- pb-1 new-account-ticket float-start">
                     <FaAngleLeft size={25} /> 
                    </Link> */}
                   <br />
                    <div className='mt-'>
                  <h4 class="text-gray-500 float-end mr-4"><BiBriefcase color='green'  size={18} /> Available Jobs </h4>
      
              </div>
               </div>
            {/* Header */}
            {/* <header className="bg-whit shadow-sm p-3 mb-4 sticky-top border-botto border-ligh">
                <h3 className="text-center text-dark d-flex align-items-center justify-content-center m-0">
                    <BiBriefcase className="me-2 text-primary" size={24} /> 
                    Available Job Postings
                </h3>
            </header> */}

            <div className="container">
                
                {/* Search and Filter Row */}
                <div className="row g-3 mb-4">
                    
                    {/* Search Bar */}
                    <div className="col-md-8">
                        <div className="input-group shadow-sm rounded-pill">
                            <span className="input-group-text bg-white border-0 rounded-start-pill">
                                <BiSearch size={20} className="text-muted" />
                            </span>
                            <input
                                type="search"
                                placeholder="Search by Title, Type, or Location..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control border-0 rounded-end-pill py-2"
                            />
                        </div>
                    </div>
                    
                    {/* Filter Dropdown */}
                    <div className="col-md-4">
                        <div className="input-group shadow-sm rounded-pill">
                            <label htmlFor="job-filter" className="input-group-text bg-white border-0 rounded-start-pill text-muted d-none d-md-flex">
                                <BiFilterAlt size={20} />
                            </label>
                            <select
                                id="job-filter"
                                value={selectedFilterKey}
                                onChange={(e) => setSelectedFilterKey(e.target.value)}
                                className="form-select border-0 bg-white rounded-pill py-2 text-muted"
                                style={{ paddingLeft: '2.5rem' }} // Space for icon if input-group isn't used perfectly
                            >
                                <option disabled value="">Filter & Sort By</option>
                                {Object.entries(filterOptions).map(([key, { label }]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Status Count */}
                <p className="text-sm text-center text-muted mb-4">
                    {filteredJobs.length} Job(s) Displayed
                </p>

                {/* Job List */}
                {filteredJobs.length === 0 && (
                    <div className="alert alert-info text-center mt-5">
                        <p className="m-0">
                            No jobs match your search or filter criteria.
                        </p>
                    </div>
                )}

                <ul className="list-unstyled space-y-4">
                    {filteredJobs.map((j) => (
                        <li key={j.id + (j.local ? "_local" : "_server")}>
                            <div
                                className={`card shadow-sm border-0 rounded-lg p-4 h-100 ${
                                    j.local ? 'bg-warning-light border-warning border-3' : 'bg-white'
                                }`}
                            >
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="card-title text-primary font-weight-bolder m-0">
                                        {j.title || 'Untitled Job'}
                                    </h5>
                                    {j.local && (
                                        <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase">
                                            Local Draft
                                        </span>
                                    )}
                                </div>

                                <div className="row g-2 text-sm text-secondary">
                                    {/* Details Grid */}
                                    <div className="col-sm-6">
                                        <JobDetailItem icon={FaClock} label="Type" value={j.jobType || 'N/A'} />
                                    </div>
                                    <div className="col-sm-6">
                                        <JobDetailItem icon={FaMapMarkerAlt} label="Location" value={j.location || 'N/A'} />
                                    </div>
                                    <div className="col-sm-6">
                                        <JobDetailItem icon={FaDollarSign} label="Salary" value={formatSalary(j.salary)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <JobDetailItem icon={FaGraduationCap} label="Qualif." value={j.qualification || 'N/A'} />
                                    </div>
                                    
                                    {/* Conditions (Full Width) */}
                                    <div className="col-12 mt-2">
                                        <span className="font-weight-bold text-muted me-1">Conditions:</span>
                                        <span className="text-secondary">{j.conditions || 'N/A'}</span>
                                    </div>
                                </div>
                                
                                {/* Footer/Timestamp */}
                                <div className="mt-3 pt-3 border-top text-end">
                                    <small className="text-muted">
                                        Posted: {j.createdAt ? new Date(j.createdAt).toLocaleString() : 'N/A'}
                                    </small>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Navigation Bar */}
            <UserNavBar />
        </div>
    );
};

export default ViewJobs;