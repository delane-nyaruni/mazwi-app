import React, { useEffect, useState } from "react";

export default function App() {
  const [publicIp, setPublicIp] = useState("");
  const [country, setCountry] = useState("");
  const [localIp, setLocalIp] = useState("");
  const [browser, setBrowser] = useState("");
  const [device, setDevice] = useState("");

  // Get Public IP + Country
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setPublicIp(data.ip);
        setCountry(data.country_name);
      })
      .catch((err) => console.error("Public IP error:", err));
  }, []);

  // Get Local IP
  useEffect(() => {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");

    pc.onicecandidate = (event) => {
      if (event && event.candidate && event.candidate.candidate) {
        const parts = event.candidate.candidate.split(" ");
        const ipAddr = parts[4];
        if (/^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1]))/.test(ipAddr)) {
          setLocalIp(ipAddr);
        }
      }
    };

    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((err) => console.error("Local IP error:", err));
  }, []);

  // Get Browser & Device Info (Raw UA parsing)
  useEffect(() => {
    const ua = navigator.userAgent;

    // --- Browser Detection ---
    let browserName = "Unknown";
    let browserVersion = "";

    if (/chrome|crios|crmo/i.test(ua) && !/edge|edg/i.test(ua)) {
      browserName = "Chrome";
      browserVersion = ua.match(/Chrome\/([\d.]+)/i)?.[1] || "";
    } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
      browserName = "Safari";
      browserVersion = ua.match(/Version\/([\d.]+)/i)?.[1] || "";
    } else if (/firefox|fxios/i.test(ua)) {
      browserName = "Firefox";
      browserVersion = ua.match(/Firefox\/([\d.]+)/i)?.[1] || "";
    } else if (/edg/i.test(ua)) {
      browserName = "Edge";
      browserVersion = ua.match(/Edg\/([\d.]+)/i)?.[1] || "";
    } else if (/opr\//i.test(ua)) {
      browserName = "Opera";
      browserVersion = ua.match(/OPR\/([\d.]+)/i)?.[1] || "";
    } else if (/msie|trident/i.test(ua)) {
      browserName = "Internet Explorer";
      browserVersion = ua.match(/(?:MSIE |rv:)([\d.]+)/i)?.[1] || "";
    }

    // --- Device/OS Detection ---
    let os = "Unknown OS";
    if (/windows nt 10/i.test(ua)) os = "Windows 10";
    else if (/windows nt 11/i.test(ua)) os = "Windows 11";
    else if (/windows nt 6.3/i.test(ua)) os = "Windows 8.1";
    else if (/windows nt 6.2/i.test(ua)) os = "Windows 8";
    else if (/windows nt 6.1/i.test(ua)) os = "Windows 7";
    else if (/mac os x/i.test(ua)) os = "macOS";
    else if (/android/i.test(ua)) os = "Android";
    else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
    else if (/linux/i.test(ua)) os = "Linux";

    let deviceType = "Desktop";
    if (/mobile/i.test(ua)) deviceType = "Mobile";
    if (/tablet/i.test(ua)) deviceType = "Tablet";

    setBrowser(`${browserName} ${browserVersion}`);
    setDevice(`${os} (${deviceType})`);
  }, []);

  return (
    <div class='gold' style={{ fontFamily: "monospace", textAlign: "center", marginTop: "50px" }}>
      <h1>Device & Network Info</h1>
      <p><b>Public IP:</b> {publicIp || "Loading..."}</p>
      <p><b>Country:</b> {country || "Loading..."}</p>
      <p><b>Local IP:</b> {localIp || "Detecting..."}</p>
      <p><b>Browser:</b> {browser || "Detecting..."}</p>
      <p><b>Device:</b> {device || "Detecting..."}</p>
    </div>
  );
}
