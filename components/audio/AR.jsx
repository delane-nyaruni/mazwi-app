import React, { useState, useEffect, useRef, useCallback } from "react";
const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [audioList, setAudioList] = useState([]);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  // ------------------ IndexedDB Setup ------------------
  const openOrCreateDB = useCallback(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MazwiDB", 7);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.contains("audioQueue")) {
          db.deleteObjectStore("audioQueue");
        }
        db.createObjectStore("audioQueue", { keyPath: "id", autoIncrement: true });
        console.log("✅ audioQueue store created/upgraded");
      };

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }, []);

  // ------------------ Load all saved audios ------------------
  const loadAudioList = useCallback(async () => {
    try {
      const db = await openOrCreateDB();
      const tx = db.transaction("audioQueue", "readonly");
      const store = tx.objectStore("audioQueue");
      const getAllReq = store.getAll();

      getAllReq.onsuccess = () => {
        const items = getAllReq.result || [];
        const listWithURLs = items.map((item) => ({
          ...item,
          url: item.url || URL.createObjectURL(item.blob),
        }));
        setAudioList(listWithURLs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      };

      tx.oncomplete = () => db.close();
    } catch (err) {
      console.error("Error loading audio list:", err);
      showPopup("Error loading audio list", "error");
    }
  }, [openOrCreateDB]);

  useEffect(() => {
    loadAudioList();
  }, [loadAudioList]);

  // ------------------ Soft popup ------------------
  const showPopup = (msg, type) => {
    const el = document.createElement("div");
    el.textContent = msg;
    el.className = type === "error" ? "msgError" : "msgSuccess";
    document.body.appendChild(el);
    el.style.display = "block";

    setTimeout(() => {
      el.style.display = "none";
      document.body.removeChild(el);
    }, 3000);
  };

  // ------------------ Save Blob to IndexedDB ------------------
  const saveToIndexedDB = useCallback(
    async (blob) => {
      try {
        const db = await openOrCreateDB();
        const tx = db.transaction("audioQueue", "readwrite");
        const store = tx.objectStore("audioQueue");

        const data = { blob, createdAt: new Date().toISOString(), uploaded: false };
        const request = store.add(data);

        request.onsuccess = () => {
          setStatus("✅ Saved locally");
          showPopup("✅ Saved locally", "success");
        };

        request.onerror = (event) => {
          console.error("Save failed:", event.target.error);
          setStatus("❌ Save failed");
          showPopup("Save failed", "error");
        };

        tx.oncomplete = () => {
          db.close();
          loadAudioList();
        };
      } catch (err) {
        console.error("IndexedDB error:", err);
        setStatus("❌ Save failed");
        showPopup("Save failed", "error");
      }
    },
    [openOrCreateDB, loadAudioList]
  );

  // ------------------ Delete an audio ------------------
  const deleteAudio = useCallback(
    async (id) => {
      try {
        const db = await openOrCreateDB();
        const tx = db.transaction("audioQueue", "readwrite");
        const store = tx.objectStore("audioQueue");
        store.delete(id);

        tx.oncomplete = () => {
          db.close();
          setStatus("🗑️ Deleted recording");
          showPopup("🗑️ Deleted recording", "success");
          setAudioList((prev) => prev.filter((item) => item.id !== id));
        };
      } catch (err) {
        console.error("Delete failed:", err);
        setStatus("❌ Delete failed");
        showPopup("❌ Delete failed", "error");
      }
    },
    [openOrCreateDB]
  );

  // ------------------ Upload a single audio ------------------
  const uploadAudio = useCallback(
    async (item) => {
      try {
        setStatus("⏫ Uploading...");
        const formData = new FormData();
        formData.append("audio", item.blob, `audio-${item.id}.webm`);

        const res = await fetch("https://your-backend.com/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const db = await openOrCreateDB();
          const tx = db.transaction("audioQueue", "readwrite");
          const store = tx.objectStore("audioQueue");
          store.delete(item.id);
          tx.oncomplete = () => db.close();

          setStatus("✅ Upload success");
          showPopup("Upload success", "success");
          loadAudioList();
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        setStatus("❌ Upload failed");
        showPopup("Upload failed", "error");
      }
    },
    [openOrCreateDB, loadAudioList]
  );

  // ------------------ Upload all pending audios ------------------
  const uploadAllAudio = useCallback(async () => {
    for (let item of audioList) {
      await uploadAudio(item);
    }
  }, [audioList, uploadAudio]);

  // ------------------ Recording Controls ------------------
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support microphone access.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunks.current = [];

      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        await saveToIndexedDB(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setStatus("🎙️ Recording...");
    } catch (err) {
      console.error("Recording start failed:", err);
      setStatus("❌ Could not start recording");
      showPopup("Could not start recording", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus("⏹️ Recording stopped");
      showPopup("Recording stopped", "success");
    }
  };

  // ------------------ Auto-upload when back online ------------------
  useEffect(() => {
    window.addEventListener("online", uploadAllAudio);
    return () => window.removeEventListener("online", uploadAllAudio);
  }, [uploadAllAudio]);

  // ------------------ UI ------------------
  return (
    <div className="containr">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-xl font-bold mb-3">Mazwi Audio Recorder</h1>
        <p className="text-sm text-gray-600 mb-4">Offline-ready audio capture</p>

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-green-600 text-white px-4 py-2 rounded-full shadow"
          >
            🎙️ Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white px-4 py-2 rounded-full shadow"
          >
            ⏹️ Stop Recording
          </button>
        )}

        <p className="mt-2 text-gray-700">{status}</p>

        <button onClick={uploadAllAudio} className="mt-3 text-blue-500 underline">
          Upload All Pending
        </button>

        <h2 className="mt-6 font-semibold text-lg">Saved Recordings</h2>
        {audioList.length === 0 && <p className="text-gray-500">No recordings yet</p>}

        <ul className="mt-2 space-y-2">
          {audioList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <audio controls src={item.url} className="flex-1 mr-2"></audio>
              <div className="flex space-x-2">
                <button
                  onClick={() => uploadAudio(item)}
                  className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                >
                  ⬆ Upload
                </button>
                <button
                  onClick={() => deleteAudio(item.id)}
                  className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioRecorder;
