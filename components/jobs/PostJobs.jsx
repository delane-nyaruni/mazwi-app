import React, { useState, useEffect, useCallback } from "react";
import { BiBriefcase, BiTrash } from "react-icons/bi";
import { FaSave, FaUpload, FaAngleLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { GiInfo } from "react-icons/gi"; 

Modal.setAppElement("#root");

// ---- CONFIG ----
// FIXED: Changed DB_NAME to a unique name to prevent clashes.
const DB_NAME = "JobsPostDB"; 
// FIXED: Starting version at 1 to ensure a fresh, clean database is created.
const DB_VERSION = 1; 
const STORE_NAME = "jobsStore";

// Options for job conditions (Remote/Hybrid/Onsite)
const CONDITION_OPTIONS = ["Remote", "Hybrid", "Onsite"];

// Options for Job Type (Full-time/Part-time/Contract/Internship)
const JOB_TYPE_OPTIONS = ["Full-time", "Part-time", "Contract", "Internship"];

export default function PostJobs() {
  const navigate = useNavigate();

  // Form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState(""); 
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]); 
  
  // Validation State
  const [errors, setErrors] = useState({});

  // Data
  const [jobsList, setJobsList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [openJobDetail, setOpenJobDetail] = useState(null); 
    
    // MODAL STATE
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null); 

  // Dark mode (kept from your app)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") === "enabled"
  );
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // -----------------------
  // openOrCreateDB - ensures store exists (Updated for new DB Name)
  // -----------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Ensure 'jobsStore' is created
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
        // Removed the unnecessary check for 'messageQueue' as it belongs in the other database.
      };

      req.onsuccess = (event) => resolve(event.target.result);
      req.onerror = (event) => reject(event.target.error);
    });
  }, []);

  // -----------------------
  // showPopup (FIXED to prevent overriding)
  // -----------------------
  const showPopup = useCallback((text, type = "success", duration = 2000) => {
    const POPUP_CLASS = 'active-app-popup';
    setStatus(text);
    
    // 1. Remove any currently active popups immediately
    document.querySelectorAll(`.${POPUP_CLASS}`).forEach(el => {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
    
    const cls = type === "error" ? "msgError" : "msgSuccess";
    const el = document.createElement("div");
    el.className = `${cls} ${POPUP_CLASS}`; // Add the unique class
    el.innerText = text;
    
    requestAnimationFrame(() => {
      document.body.appendChild(el);
      el.style.display = "block";
    });

    setTimeout(() => {
      try {
        el.style.display = "none";
        if (el.parentNode) {
          document.body.removeChild(el);
        }
      } catch {}
      setStatus("idle");
    }, duration);
  }, []);

  // -----------------------
  // loadJobs
  // -----------------------
  const loadJobs = useCallback(async () => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getAllReq = store.getAll();

      getAllReq.onsuccess = () => {
        const items = getAllReq.result || [];
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobsList(items);
      };

      tx.oncomplete = () => {
        try { db.close(); } catch (e) {}
      };
    } catch (err) {
      console.error("loadJobs error", err);
      showPopup("Could not load jobs", "error");
    }
  }, [openOrCreateDB, showPopup]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);
  
  // -----------------------
  // Condition Checkbox Handler
  // -----------------------
  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) => 
      prev.includes(condition) 
        ? prev.filter((c) => c !== condition) 
        : [...prev, condition]
    );
    // Clear error on change
    setErrors(prev => ({ ...prev, conditions: null }));
  };
    
    // Job Type Radio Handler
    const handleJobTypeChange = (type) => {
        setJobType(type);
        // Clear error on change
        setErrors(prev => ({ ...prev, jobType: null }));
    };

  // -----------------------
  // Validation Logic (Wrapped in useCallback)
  // -----------------------
  const validateForm = useCallback(() => {
    let newErrors = {};
    
    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required.";
    }
    if (!jobType.trim()) {
      newErrors.jobType = "Please select a Job Type.";
    }
    if (!salary.trim()) {
      newErrors.salary = "Salary is required.";
    } else if (isNaN(Number(salary))) {
      newErrors.salary = "Salary must be a number.";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!qualification.trim()) {
      newErrors.qualification = "Qualification is required.";
    }
    if (selectedConditions.length === 0) {
      newErrors.conditions = "Please select at least one condition (Remote/Hybrid/Onsite).";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [jobTitle, jobType, salary, location, qualification, selectedConditions]);


  // -----------------------
  // saveJob
  // -----------------------
  const saveJob = useCallback(async () => {
    
    // Run validation check
    if (!validateForm()) {
      showPopup("Please fix the required fields.", "error");
      return;
    }

    try {
      const db = await openOrCreateDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
    
      const conditionsString = selectedConditions.join(', ');

      const data = {
        title: jobTitle.trim(),
        jobType, 
        salary: Number(salary), 
        location,
        qualification,
        conditions: conditionsString,
        uploaded: false,
        createdAt: new Date().toISOString(),
      };

      const addReq = store.add(data);

      addReq.onsuccess = () => {
        showPopup("Saved locally", "success");
        // Reset form fields and errors
        setJobTitle("");
        setJobType(""); 
        setSalary("");
        setLocation("");
        setQualification("");
        setSelectedConditions([]); 
        setErrors({}); // Clear all errors after successful save
        loadJobs();
      };

      addReq.onerror = (e) => {
        console.error("saveJob add error", e);
        showPopup("Save failed", "error");
      };

      tx.oncomplete = () => {
        try { db.close(); } catch (e) {}
      };
    } catch (err) {
      console.error("saveJob error", err);
      showPopup("Save failed", "error");
    }
  }, [
    jobTitle, jobType, salary, location, 
    qualification, selectedConditions, openOrCreateDB, 
    loadJobs, showPopup, validateForm 
]);

  // -----------------------
  // deleteJob (core logic)
  // -----------------------
  const deleteJob = useCallback(async (id) => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);

      tx.oncomplete = () => {
        try { db.close(); } catch (e) {}
        showPopup("Deleted", "success");
        setJobsList((prev) => prev.filter((j) => j.id !== id));
        setDeleteModalIsOpen(false);
        setJobToDelete(null);
      };

      tx.onerror = (e) => {
        console.error("deleteJob tx error", e);
        showPopup("Delete failed", "error");
        setDeleteModalIsOpen(false);
        setJobToDelete(null);
      };
    } catch (err) {
      console.error("deleteJob err", err);
      showPopup("Delete failed", "error");
      setDeleteModalIsOpen(false);
      setJobToDelete(null);
    }
  }, [openOrCreateDB, showPopup]);
    
    // -----------------------
    // deleteJobWithConfirmation (handles modal)
    // -----------------------
    const deleteJobWithConfirmation = (id) => {
        setJobToDelete(id);
        setDeleteModalIsOpen(true);
    };

  // -----------------------
  // uploadJob (single)
  // -----------------------
  const uploadJob = useCallback(async (job) => {
    try {
      showPopup("Uploading...", "success");
      const { id, ...jobToUpload } = job;

      // replace with your real endpoint
      const res = await fetch("https://your-backend.com/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobToUpload),
      });

      if (res.ok) {
        const db = await openOrCreateDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(job.id);
        tx.oncomplete = () => {
          try { db.close(); } catch (e) {}
          showPopup("Uploaded", "success");
          loadJobs();
        };
      } else {
        throw new Error("upload failed");
      }
    } catch (err) {
      console.warn("uploadJob err", err);
      showPopup("Upload failed, will retry", "error");
    }
  }, [openOrCreateDB, loadJobs, showPopup]);

  // -----------------------
  // uploadAllJobs (wrapped in useCallback)
  // -----------------------
  const pendingJobsCount = jobsList.length;

  const uploadAllJobs = useCallback(async () => {
    const itemsToUpload = jobsList.filter(j => !j.uploaded); 
    if (itemsToUpload.length === 0) {
        showPopup("No pending jobs to upload.", "info");
        return;
    }
    showPopup(`Starting upload of ${itemsToUpload.length} jobs...`, "success");

    for (const item of itemsToUpload) {
      await uploadJob(item);
    }

  }, [jobsList, uploadJob, showPopup]); 

  // auto-upload on connection restore
  useEffect(() => {
    const handleOnline = () => {
      uploadAllJobs();
    };
    window.addEventListener("online", handleOnline);
    // try immediate upload if online
    if (navigator.onLine) uploadAllJobs();

    return () => window.removeEventListener("online", handleOnline);
  }, [uploadAllJobs]);

  // -----------------------
  // UI with Validation Highlights
  // -----------------------
  return (
    <div className="mt-0 container" onLoad={() => setDarkMode(!darkMode)}>
   
{/*          <div className='main-title-nav  '>
             <Link onClick={() => navigate(-1)}  class="btn btn-succes  new-account-ticket float-start">
                     <FaAngleLeft size={25} /> 
                    </Link>
                  <h4 class="text-gray-500 float-end "><BiBriefcase color='green'  size={18} /> Post Job </h4>

                    <div className='mt-'>
      
              </div>
               </div> */}

    <div className='main-title mb-2'> 
                <Link onClick={() => navigate(-1)} className="btn btn-succes mt-2 pb-1 new-account-ticket ">
                    <FaAngleLeft size={25} /> 
                </Link>
                <h4 className="text-gray-500 mt-2 float-end"> Post Job <BiBriefcase color='green'  size={25} /></h4>
                {/* <div style={{ clear: 'both' }}></div> Simple float clear */}
            </div>
    
    {/* Form Card (Container kept) */}
{/*       <div className="container mt-0 car shado "> */}
        <h5 className="text-primary  "> Fill Form</h5>
        
        
        {/* 1. Job Title */}
{/*         <div className="form-group mb-0"> */}
            <label htmlFor="jobTitle" className={errors.jobTitle ? 'text-danger float-start' : ''}>Job Title *</label>
            <input
                id="jobTitle"
                className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                placeholder="e.g., Farmer"
                value={jobTitle}
                onChange={(e) => { 
                    setJobTitle(e.target.value);
                    setErrors(prev => ({ ...prev, jobTitle: null })); // Clear error on change
                }}
                required
            />
            {errors.jobTitle && <div className="invalid-feedback d-block">{errors.jobTitle}</div>}
{/*         </div> */}

        {/* 2. Job Type Radio Button Group */}
        <div className="form-group mb-0 card">
            <label className={`form-labl float-start d-bock mb-1 ${errors.jobType ? 'text-danger' : ''}`}>
                Job Type *
            </label>
            <div className="d-flex flex-wrap ">
                {JOB_TYPE_OPTIONS.map(type => (
                    <div className="form-check form-check-inline" key={type}>
                        <input
                            className={`form-check-input ${errors.jobType ? 'is-invalid' : ''}`}
                            type="radio"
                            name="jobTypeRadio"
                            id={`radio-${type}`}
                            value={type}
                            checked={jobType === type}
                            onChange={() => handleJobTypeChange(type)}
                            required={!jobType}
                        />
                        <label className="form-check-label" htmlFor={`radio-${type}`}>
                            {type}
                        </label>
                    </div>
                ))}
            </div>
            {errors.jobType && <div className="text-danger small mt-1">{errors.jobType}</div>}
        </div>
        {/* End Job Type Group */}


        {/* 3. Salary */}
{/*         <div className="form-group mb-3"> */}
            <label htmlFor="salary" className={errors.salary ? 'text-danger float-start' : ''}>Salary ($) *</label>
            <input
                id="salary"
                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                placeholder="Enter salary amount e.g $100.00"
                value={salary}
                onChange={(e) => { 
                    setSalary(e.target.value); 
                    setErrors(prev => ({ ...prev, salary: null })); // Clear error on change
                }}
                type="number" 
                min="0"
                step="any"
                required
            />
            {errors.salary && <div className="invalid-feedback d-block">{errors.salary}</div>}
{/*         </div> */}

        {/* 4. Location */}
{/*         <div className="form-group mb-3"> */}
            <label htmlFor="location" className={errors.location ? 'text-danger float-start mt-5' : ''}>Location *</label>
            <input
                id="location"
                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                placeholder="e.g., Murombedzi"
                value={location}
                onChange={(e) => {
                    setLocation(e.target.value);
                    setErrors(prev => ({ ...prev, location: null })); // Clear error on change
                }}
                required
            />
            {errors.location && <div className="invalid-feedback d-block">{errors.location}</div>}
{/*         </div> */}

        {/* 5. Qualification */}
        <div className="form-group mb-3">
            <label htmlFor="qualification" className={errors.qualification ? 'text-danger float-start' : ''}>Qualification *</label>
            <input
                id="qualification"
                className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
                placeholder="e.g., Agriculture"
                value={qualification}
                onChange={(e) => {
                    setQualification(e.target.value);
                    setErrors(prev => ({ ...prev, qualification: null })); // Clear error on change
                }}
                required
            />
            {errors.qualification && <div className="invalid-feedback d-block">{errors.qualification}</div>}
        </div>

        {/* 6. Conditions Checkbox Group */}
      <div className="form-group mb-3 card">
            <label className={`form-label float-start p-0 d-block mb-0 ${errors.conditions ? 'text-danger float-start' : ''}`}>
                Conditions *
            </label>
     <div className="d-flex flex-wrap ga">
                {CONDITION_OPTIONS.map(condition => (
                    <div className="form-check form-check-inline" key={condition}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`check-${condition}`}
                            value={condition}
                            checked={selectedConditions.includes(condition)}
                            onChange={() => handleConditionChange(condition)}
                        />
                        <label className="form-check-label" htmlFor={`check-${condition}`}>
                            {condition}
                        </label>
                    </div>
                ))}
            </div>
            {errors.conditions && <div className="text-danger small mt-1">{errors.conditions}</div>}
        </div>
        {/* End Conditions Group */}


        <div className="d-grid gap-2">
          <button onClick={saveJob} className="mt-3 text-blue-500 underline btn btn-primary btn-use btn-block BR15 tansparent">
            <FaSave size={25} className='mr-3 mt-1 mb-1'  /> Save Job Locally
          </button>
        </div>
{/*       </div> */}

      <hr className="my-" />
    
      <h5 className="mt-4">
        Saved Jobs (Pending Upload: <span className="text-danger">{pendingJobsCount}</span>)
    </h5>
      {jobsList.length === 0 && <p className="text-gray-500 pl-5 ">No jobs saved yet</p>}

    {/* Upload Button Section */}
        <div className="containe d-grid gap-2 mb-4">
            <button 
                onClick={uploadAllJobs} 
                className={`btn ${pendingJobsCount > 0 ? 'btn-success' : 'btn-secondary'} btn-use btn-block BR15`} 
                disabled={pendingJobsCount === 0}
            >
                <FaUpload size={20} className='mr-2 mt-1 mb-1'  /> Upload  Pending Jobs ({pendingJobsCount})
{/*                 <FaUpload size={20} className='mr-2 '  /> Upload  Pending Jobs ({pendingJobsCount}) */}
            </button>
        </div>

      <ul className="mt-0 list-unstyled container p-0">
        {jobsList.map((j) => (
            // Collapsible Job Item
          <li key={j.id} className="pl-3 mb-0 border rounde shadow-sm bg-light">
                <div 
                    className="d-flex justify-content-between align-items-left" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenJobDetail(openJobDetail === j.id ? null : j.id)}
                >
{/*                     <div className="flex-grow-1"> */}
                        <strong className="text-dark float-start">{j.title}</strong>
                       
{/*                     </div> */}
                    <div className="d-flex align-items-center gap-2">
                        {openJobDetail === j.id ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </div>
                </div>

                {/* Dropdown Content (Details) */}
                {openJobDetail === j.id && (
                    <div className="mt-0 pt-0 border-top small text-gray-700">
         {/* <p className="text-muted small ">
                            {j.jobType || "-"} • {j.conditions || "-"} 
                        </p> */}
                        <p className="mb-1"><strong>Job Type:</strong> {j.jobType || "-"} • {j.conditions || "-"}</p>

                        <p className="mb-1"><strong>Location:</strong> {j.location}</p>
                        <p className="mb-1"><strong>Salary:</strong> ${j.salary ? j.salary.toLocaleString() : 'N/A'}</p>
                        <p className="mb-1"><strong>Qualification:</strong> {j.qualification}</p>
                        <p className="mb-1"><strong>Posted:</strong> {new Date(j.createdAt).toLocaleString()}</p>

                          <div className="fle space-x-2  justify-content-center   mt-3 ">
                       <button
                        onClick={(e) => { e.stopPropagation(); deleteJobWithConfirmation(j.id); }} title="Delete"
                        className="text-sm bg-red-600 text-white m-2 mr-5 px-2 py-1 rounded btn btn-danger btn-user btn-bloc R15 transparent"
                      >
                        <BiTrash size={25} color="" /> Delete
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); uploadJob(j); }} title="Upload"
                        className="text-sm bg-blue-600 text-white px-2 py-1 rounded btn btn-info btn-use btn-bloc R15 transparen"
                      >
                        <HiUpload size={25} color="" /> Upload
                      </button>
                     
                    </div>

{/* <div className="d-flex gap-2 mt-3 justify-content-end"> */}

                            {/* Delete Button with Modal Trigger */}
{/*                             <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); deleteJobWithConfirmation(j.id); }} title="Delete">
                                <BiTrash /> Delete
                            </button>
                            <button className="btn btn-info btn-sm" onClick={(e) => { e.stopPropagation(); uploadJob(j); }} title="Upload">
                                <HiUpload /> Upload
                            </button> */}
{/*                         </div> */}
                    </div>
                )}
          </li>
        ))}
      </ul>

      {/* status indicator (optional) */}
      {status !== "idle" && <div className="mt-2 text-muted small">Status: {status}</div>}

    {/* DELETE CONFIRMATION MODAL */}
    <Modal 
        isOpen={deleteModalIsOpen}
        shouldCloseOnOverlayClick={false}
        // Minimal, reliable styling for centering and background
        style={{
            overlay:{
                backgroundColor: 'rgba(94, 92, 92, 0.73)', 
                zIndex: 1050 
            },
            content:{ 
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '90%', 
                maxWidth: '400px', 
                padding: '0',
                borderRadius: '10px',
            }
        }}
        onRequestClose={() => setDeleteModalIsOpen(false)}>
        <div class="modal-dialog m-0">
            <div class="modal-content">
                <div class="modal-header border-bottom-0 p-3">
                    <h5 class="modal-title text-gray-800" id="deleteModalLabel">
                        Confirm Delete? 
                        <GiInfo size={17} color='red' className="ml-2"/> 
                    </h5>
                    {/* Use the standard close button for visibility */}
                    <button type="button" class="close" onClick={() => setDeleteModalIsOpen(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center p-4">
                    <p className="text-gray-700">Are you sure you want to **permanently delete** this job posting?</p>
                    <p className="text-danger font-weight-bold">This action cannot be undone.</p>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-between p-3">

        <div className="flex space-x-2">
                       <button
                        onClick={() => setDeleteModalIsOpen(false)}
                        className="text-sm bg-red-600 text-white m-2 mr-5 px-2 py-1 rounded btn btn-secondary btn-user btn-bloc R15 transparent"
                      >
                        <BiTrash size={25} color="" /> Cancel
                      </button>
                      <button
                        onClick={() => deleteJob(jobToDelete)}
                        className="text-sm bg-blue-600 text-white px-2 py-1 rounded btn btn-danger btn-user btn-bloc R15 transparent"
                      >
                        <BiTrash size={25} color="" /> Delete
                      </button>
                     
                    </div>


                    

{/*                     <button 
                        onClick={() => setDeleteModalIsOpen(false)} 
                        class="btn btn-secondary flex-grow-1 mr-2" 
                        type="button">
                        Cancel
                    </button>
                    <button 
                        onClick={() => deleteJob(jobToDelete)} 
                        class="btn btn-danger flex-grow-1" 
                        type="button">
                        Confirm Delete
                    </button> */}
                </div>
            </div>
        </div>
    </Modal>
  </div>
  );
}