import React, { useState, useEffect, useCallback } from "react";
import { BiTrash } from "react-icons/bi";
import { FaSave, FaUpload, FaAngleLeft } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

// ---- CONFIG ----
const DB_NAME = "MazwiDB";
const DB_VERSION = 11; // bumped to force onupgradeneeded if older schema exists
const STORE_NAME = "jobsStore";

export default function Jobs() {
  const navigate = useNavigate();

  // Form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [conditions, setConditions] = useState("");

  // Data
  const [jobsList, setJobsList] = useState([]);
  const [status, setStatus] = useState("idle");

  // Dark mode (kept from your app)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") === "enabled"
  );
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // -----------------------
  // openOrCreateDB - ensures store exists
  // -----------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (event) => {
        const db = event.target.result;
        // create store if missing
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
      };

      req.onsuccess = (event) => resolve(event.target.result);
      req.onerror = (event) => reject(event.target.error);
    });
  }, []);

  // -----------------------
  // showPopup (CSS-based small message, kept simple)
  // -----------------------
  const showPopup = useCallback((text, type = "success", duration = 2000) => {
    setStatus(text);
    const cls = type === "error" ? "msgError" : "msgSuccess";
    const el = document.createElement("div");
    el.className = cls;
    el.innerText = text;
    document.body.appendChild(el);
    el.style.display = "block";
    setTimeout(() => {
      try {
        el.style.display = "none";
        document.body.removeChild(el);
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
        // sort newest first
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
  // saveJob
  // -----------------------
  const saveJob = useCallback(async () => {
    if (!jobTitle.trim()) {
      showPopup("Job title required", "error");
      return;
    }

    try {
      const db = await openOrCreateDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const data = {
        title: jobTitle.trim(),
        jobType,
        salary,
        location,
        qualification,
        conditions,
        uploaded: false,
        createdAt: new Date().toISOString(),
      };

      const addReq = store.add(data);

      addReq.onsuccess = () => {
        showPopup("Saved locally", "success");
        setJobTitle("");
        setJobType("");
        setSalary("");
        setLocation("");
        setQualification("");
        setConditions("");
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
  }, [jobTitle, jobType, salary, location, qualification, conditions, openOrCreateDB, loadJobs, showPopup]);

  // -----------------------
  // deleteJob
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
      };

      tx.onerror = (e) => {
        console.error("deleteJob tx error", e);
        showPopup("Delete failed", "error");
      };
    } catch (err) {
      console.error("deleteJob err", err);
      showPopup("Delete failed", "error");
    }
  }, [openOrCreateDB, showPopup]);

  // -----------------------
  // uploadJob (single)
  // -----------------------
  const uploadJob = useCallback(async (job) => {
    try {
      showPopup("Uploading...", "success");

      // replace with your real endpoint
      const res = await fetch("https://your-backend.com/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
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
  const uploadAllJobs = useCallback(async () => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getAllReq = store.getAll();

      getAllReq.onsuccess = async () => {
        const items = getAllReq.result || [];
        // sequential upload to avoid flooding
        for (const item of items) {
          // only attempt for items not uploaded (but we store uploaded flag locally, backend deletion is used)
          await uploadJob(item);
        }
      };

      tx.oncomplete = () => {
        try { db.close(); } catch (e) {}
      };
    } catch (err) {
      console.warn("uploadAllJobs err", err);
      showPopup("Upload all failed", "error");
    }
  }, [openOrCreateDB, uploadJob, showPopup]);

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
  // UI
  // -----------------------
  return (
    <div className="container" onLoad={() => setDarkMode(!darkMode)}>
      <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
        <FaAngleLeft /> Back
      </button>

      <div className="main-title mt-3">
        <h4 className="text-gray-500">Post Job</h4>
      </div>

      <div className="container mt-3">
        <input
          className="form-control mb-2"
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Job type (Full-time, Part-time...)"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Conditions (e.g., Remote)"
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
        />

        <div className="d-grid gap-2">
          <button onClick={saveJob} className="btn btn-primary">
            <FaSave className="me-2" /> Save Job
          </button>

          <button onClick={uploadAllJobs} className="btn btn-success mt-2">
            <FaUpload className="me-2" /> Upload All Pending
          </button>
        </div>
      </div>

      <hr />

      <h5 className="mt-4">Saved Jobs</h5>
      {jobsList.length === 0 && <p className="text-gray-500">No jobs saved yet</p>}

      <ul className="mt-3 list-unstyled">
        {jobsList.map((j) => (
          <li key={j.id} className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
            <div>
              <strong>{j.title}</strong>
              <div className="text-muted small">
                {j.location || "-"} • {j.jobType || "-"} • {j.conditions || "-"}
              </div>
              <div className="text-muted small">Posted: {new Date(j.createdAt).toLocaleString()}</div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-danger btn-sm" onClick={() => deleteJob(j.id)} title="Delete">
                <BiTrash />
              </button>
              <button className="btn btn-info btn-sm" onClick={() => uploadJob(j)} title="Upload">
                <HiUpload />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* status indicator (optional) */}
      {status !== "idle" && <div className="mt-2 text-muted small">Status: {status}</div>}
    </div>
  );
}
