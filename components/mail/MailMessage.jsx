import React, { useState, useEffect, useCallback } from "react";
import { BiMailSend, BiTrash } from "react-icons/bi";
import { BsMailbox} from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const MailMessages = () => {
  const [messagesList, setMessagesList] = useState([]);
  const [showPopupText, setShowPopupText] = useState("");
  const navigate = useNavigate();

  // ------------------ Popup ------------------
  const showPopup = (text, duration = 2000) => {
    setShowPopupText(text);
    setTimeout(() => setShowPopupText(""), duration);
  };

  // ------------------ IndexedDB Setup ------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MazwiDB", 11);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("messagesStore")) {
          db.createObjectStore("messagesStore", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }, []);

  // ------------------ Load messages ------------------
  const loadMessages = useCallback(async () => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction("messagesStore", "readonly");
      const store = tx.objectStore("messagesStore");
      const getAllReq = store.getAll();
      getAllReq.onsuccess = () => {
        const items = getAllReq.result || [];
        setMessagesList(items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      };
      tx.oncomplete = () => db.close();
    } catch (err) {
      console.warn("⚠ Load error:", err);
      showPopup("Could not load messages");
    }
  }, [openOrCreateDB]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // ------------------ Delete message ------------------
  const deleteMessage = useCallback(
    async (id) => {
      try {
        const db = await openOrCreateDB();
        const tx = db.transaction("messagesStore", "readwrite");
        const store = tx.objectStore("messagesStore");
        store.delete(id);

        tx.oncomplete = () => {
          db.close();
          showPopup("Deleted message");
          setMessagesList((prev) => prev.filter((m) => m.id !== id));
        };
        tx.onerror = (e) => {
          console.warn("⚠ Delete error:", e);
          showPopup("Delete failed");
        };
      } catch (err) {
        console.warn("⚠ Delete exception:", err);
        showPopup("Delete failed");
      }
    },
    [openOrCreateDB]
  );

  // ------------------ Upload message ------------------
  const uploadMessage = useCallback(
    async (msgItem) => {
      try {
        showPopup("Uploading...");
        const res = await fetch("https://your-backend.com/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(msgItem),
        });

        if (res.ok) {
          const db = await openOrCreateDB();
          const tx = db.transaction("messagesStore", "readwrite");
          const store = tx.objectStore("messagesStore");
          store.delete(msgItem.id);

          tx.oncomplete = () => {
            db.close();
            showPopup("Uploaded successfully");
            loadMessages();
          };
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        console.warn("⚠ Upload error:", err);
        showPopup("Upload failed, will retry later");
      }
    },
    [openOrCreateDB, loadMessages]
  );

  // ------------------ Auto-upload when online ------------------
  useEffect(() => {
    const uploadAll = async () => {
      for (let m of messagesList) await uploadMessage(m);
    };
    window.addEventListener("online", uploadAll);
    return () => window.removeEventListener("online", uploadAll);
  }, [messagesList, uploadMessage]);

  return (
    <div className="container mt-4">
       <div className='main-title mb-2'> 
                <Link onClick={() => navigate(-1)} className="btn btn-succes mt-2 pb-1 new-account-ticket ">
                    <FaAngleLeft size={25} /> 
                </Link>
                <h4 className="text-gray-500 mt-2 float-end"> Mail Messages <BiMailSend color='green'  size={25} /></h4>
                {/* <div style={{ clear: 'both' }}></div> Simple float clear */}
            </div>
      {showPopupText && <div style={styles.popup}>{showPopupText}</div>}

      <BsMailbox color='green' className="float-end m-5" size={60} /><br /><br /><br /><br />
      {messagesList.length === 0 && <p className="text-gray-500 m-5 py-5 px-0 ">No messages yet.</p>}

      <ul className="space-y-3">
        {messagesList.map((m) => (
          <li key={m.id} className="bg-gray-100 p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1 mb-2 md:mb-0">
              <p><strong>From:</strong> {m.sender || "Admin"}</p>
              <p><strong>Subject:</strong> {m.subject || "-"}</p>
              <p><strong>Message:</strong> {m.text}</p>
              <p className="text-xs text-gray-400">Sent: {new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-danger" onClick={() => deleteMessage(m.id)}>
                <BiTrash /> Delete
              </button>
              <button className="btn btn-success" onClick={() => uploadMessage(m)}>
                <HiUpload /> Upload
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

const styles = {
  popup: {
    position: "fixed",
    top: 20,
    left: "25%",
    padding: "15px",
    background: "rgb(8, 229, 100)",
    color: "white",
    borderRadius: 5,
    zIndex: 1000,
  },
};

export default MailMessages;
