import React, { useState, useEffect, useCallback } from "react";
import { BiTrash} from "react-icons/bi";
import { FaAngleLeft, FaSave, FaUpload } from "react-icons/fa";
import {  FaPencil } from "react-icons/fa6";
import { HiUpload } from "react-icons/hi";
import {TbMessage2} from "react-icons/tb";
import { Link , useNavigate} from "react-router-dom";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark-mode') === 'enabled');
    useEffect(() => { 
      document.body.classList.toggle('dark-mode', darkMode); 
      localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
     }, [darkMode]); 
    

  // ------------------ Show CSS-based popup ------------------
  const showPopup = (text, type = "success", duration = 3000) => {
    const popupClass = type === "error" ? "msgError" : "msgSuccess";
    let popup = document.createElement("div");
    popup.className = popupClass;
    popup.innerText = text;
    document.body.appendChild(popup);
    popup.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
      document.body.removeChild(popup);
    }, duration);
  };

      const navigate = useNavigate()


  // ------------------ IndexedDB Setup ------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MazwiDB", 11);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("messageQueue")) {
          db.createObjectStore("messageQueue", { keyPath: "id", autoIncrement: true });
          console.log("✅ messageQueue store created");
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
      const tx = db.transaction("messageQueue", "readonly");
      const store = tx.objectStore("messageQueue");
      const getAllReq = store.getAll();

      getAllReq.onsuccess = () => {
        const items = getAllReq.result || [];
        setMessageList(items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      };

      tx.oncomplete = () => db.close();
    } catch (err) {
      console.warn("⚠ Load error:", err);
      showPopup("Could not load messages", "error");
    }
  }, [openOrCreateDB]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // ------------------ Save message ------------------
  const saveMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;
      try {
        const db = await openOrCreateDB();
        const tx = db.transaction("messageQueue", "readwrite");
        const store = tx.objectStore("messageQueue");
        const data = { text, createdAt: new Date().toISOString(), uploaded: false };

        store.add(data);


        tx.oncomplete = () => {
          db.close();
          setMessage("");
          showPopup(" Saved locally", "success");
          loadMessages();
        };
        tx.onerror = (e) => {
          console.warn("⚠ Save error:", e);
          showPopup("Save failed", "error");
        };
      } catch (err) {
        console.warn("⚠ IndexedDB error:", err);
        showPopup("Save failed", "error");
      }
    },
    [openOrCreateDB, loadMessages]
  );

  // ------------------ Delete message ------------------
  const deleteMessage = useCallback(
    async (id) => {
      try {
        const db = await openOrCreateDB();
        const tx = db.transaction("messageQueue", "readwrite");
        const store = tx.objectStore("messageQueue");
        store.delete(id);

        tx.oncomplete = () => {
          db.close();
          showPopup("Deleted message", "success");
          setMessageList((prev) => prev.filter((m) => m.id !== id));
        };
        tx.onerror = (e) => {
          console.warn("⚠ Delete error:", e);
          showPopup("Delete failed", "error");
        };
      } catch (err) {
        console.warn("⚠ Delete exception:", err);
        showPopup("Delete failed", "error");
      }
    },
    [openOrCreateDB]
  );

  // ------------------ Upload one message ------------------
  const uploadMessage = useCallback(
    async (msg) => {
      try {
        showPopup("Uploading...", "success");
        const res = await fetch("https://your-backend.com/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: msg.text, createdAt: msg.createdAt }),
        });

        if (res.ok) {
          const db = await openOrCreateDB();
          const tx = db.transaction("messageQueue", "readwrite");
          const store = tx.objectStore("messageQueue");
          store.delete(msg.id);

          tx.oncomplete = () => {
            db.close();
            showPopup("Uploaded successfully", "success");
            loadMessages();
          };
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        console.warn("⚠ Upload error:", err);
        showPopup("Upload failed, will retry later", "error");
      }
    },
    [openOrCreateDB, loadMessages]
  );

  // ------------------ Upload all pending ------------------
  const uploadAllMessages = useCallback(async () => {
    for (let msg of messageList) {
      await uploadMessage(msg);
    }
  }, [messageList, uploadMessage]);

  // ------------------ Auto-upload when online ------------------
  useEffect(() => {
    window.addEventListener("online", uploadAllMessages);
    return () => window.removeEventListener("online", uploadAllMessages);
  }, [uploadAllMessages]);

  // ------------------ UI ------------------
  return (
  <>
  <br />
   <div onLoad={() => setDarkMode(!darkMode)}  className='main-title'>
       <Link onClick={() => navigate(-1)}  class="btn btn-succes ml-3 mt-2 pb-1 new-account-ticket float-start">
               <FaAngleLeft size={25} /> 
              </Link>
             <br />
              <div className='mt-3'>
            <h4 class="text-gray-500 float-end mr-4"><FaPencil color='gold'  size={18} /> Nyora </h4>

        </div>
                          {/* <h4 class="text-gray-500 mt-2 float-end">Bitcoin Pay</h4> */}

         </div>
 
 
    <div className="containe  text-cente p-0 m-0">
      {/* <h1 className="text-xl font-bold text-gray-500 mb-0">Mazwi Offline Messages</h1> */}
        <textarea required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nyora meseji yako pano..."
        className=" text-cente borde rounded mt-4 mb-4 ml-5 p-5  h-5  form-contro"
      ></textarea>
  <div className="container">
  
 <button
        onClick={() => saveMessage(message)}
        className=" text-whit rounded-full shado btn btn-primary btn-user btn-block BR15 transparent"
      >
        <FaSave size={25} className='mr-3 mt-1 mb-1'  />Save Message
      </button>

      <button onClick={uploadAllMessages} className=" text-whit rounded-full shado btn btn-primary btn-user btn-block BR15 transparent">
        <FaUpload size={25} className='mr-3 mt-1 mb-1'  />Upload All Pending
      </button>

  </div>
     

      <h2 className="mt-6 font-semibold text-lg">Saved Messages</h2>
      {messageList.length === 0 && <span><hr className="container text-gray-600" /><p className="text-gray-500">No <TbMessage2 /> messages yet </p></span>}

      <ul className="mt-2 space-y-2">
        {messageList.map((msg) => (
          <li
            key={msg.id}
            className="flex items-center text-gray-500 justify-between bg-gray-00 p-2 rounded"
          >
            <span className="flex-1 text-left">{msg.text}</span>
            <br /><br />
            <div className="flex space-x-2">
               <button
                onClick={() => deleteMessage(msg.id)}
                className="text-sm bg-red-600 text-white m-2 mr-5 px-2 py-1 rounded btn btn-danger btn-user btn-bloc R15 transparent"
              >
                <BiTrash size={25} color="" /> Delete
              </button>
              <button
                onClick={() => uploadMessage(msg)}
                className="text-sm bg-blue-600 text-white px-2 py-1 rounded btn btn-success btn-user btn-bloc R15 transparent"
              >
                <HiUpload size={25} color="" /> Upload
              </button>
             <br /><br />
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Message;
