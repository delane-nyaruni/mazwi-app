import React, { useState, useEffect, useCallback } from "react";

const Message = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Idle");
  const [messageList, setMessageList] = useState([]);

  // ------------------ IndexedDB Setup ------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MazwiDB", 8); // bump version

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

  // ------------------ Load all messages ------------------
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
      console.error("Error loading messages:", err);
    }
  }, [openOrCreateDB]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // ------------------ Save message to IndexedDB ------------------
  const saveMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction("messageQueue", "readwrite");
      const store = tx.objectStore("messageQueue");
      const data = {
        text,
        createdAt: new Date().toISOString(),
        uploaded: false,
      };
      store.add(data);
      tx.oncomplete = () => {
        db.close();
        setMessage("");
        setStatus("💾 Saved locally");
        loadMessages();
      };
    } catch (err) {
      console.error("Save failed:", err);
      setStatus("❌ Save failed");
    }
  }, [openOrCreateDB, loadMessages]);

  // ------------------ Delete message ------------------
  const deleteMessage = useCallback(async (id) => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction("messageQueue", "readwrite");
      const store = tx.objectStore("messageQueue");
      store.delete(id);
      tx.oncomplete = () => {
        db.close();
        setStatus("🗑️ Deleted message");
        setMessageList((prev) => prev.filter((m) => m.id !== id));
      };
    } catch (err) {
      console.error("Delete failed:", err);
      setStatus("❌ Delete failed");
    }
  }, [openOrCreateDB]);

  // ------------------ Upload one message ------------------
  const uploadMessage = useCallback(async (msg) => {
    try {
      setStatus("⏫ Uploading...");
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
        tx.oncomplete = () => db.close();

        setStatus("✅ Uploaded successfully");
        loadMessages();
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("❌ Upload failed");
    }
  }, [openOrCreateDB, loadMessages]);

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
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-3">Mazwi Offline Messages</h1>
      <p className="text-sm text-gray-600 mb-4">Write and save messages locally</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="w-full border rounded p-2 mb-2"
      ></textarea>

      <button
        onClick={() => saveMessage(message)}
        className="bg-green-600 text-white px-4 py-2 rounded-full shadow"
      >
        💾 Save Message
      </button>

      <p className="mt-2 text-gray-700">{status}</p>

      <button onClick={uploadAllMessages} className="mt-3 text-blue-500 underline">
        Upload All Pending
      </button>

      <h2 className="mt-6 font-semibold text-lg">Saved Messages</h2>
      {messageList.length === 0 && <p className="text-gray-500">No messages yet</p>}

      <ul className="mt-2 space-y-2">
        {messageList.map((msg) => (
          <li
            key={msg.id}
            className="flex items-center text-gray-500 justify-between bg-gray-100 p-2 rounded"
          >
            <span className="flex-1 text-left">{msg.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => uploadMessage(msg)}
                className="text-sm bg-blue-600 text-gray-500 px-2 py-1 rounded"
              >
                ⬆ Upload
              </button>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="text-sm bg-red-600 text-white px-2 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
