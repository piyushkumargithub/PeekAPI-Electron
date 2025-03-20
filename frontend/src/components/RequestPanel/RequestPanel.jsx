import React, { useState, useEffect } from "react";
import styles from "./RequestPanel.module.scss";

const RequestPanel = ({ onResponse, selectedRequest }) => {
  const [activeTab, setActiveTab] = useState("headers");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedRequest) {
      setMethod(selectedRequest.method);
      setUrl(selectedRequest.url);
      setHeaders("");
      setBody("");
    }
  }, [selectedRequest]);

  const handleSend = async () => {
    if (!url) return;

    setIsLoading(true);
    try {
      const headersObj = headers ? JSON.parse(headers) : {};
      const bodyObj = body ? JSON.parse(body) : null;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headersObj
        },
        body: bodyObj ? JSON.stringify(bodyObj) : undefined
      });

      const responseData = await response.json();
      
      onResponse({
        status: response.status,
        body: responseData
      });
    } catch (error) {
      onResponse({
        status: 500,
        body: { error: error.message }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.requestPanel}>
      {/* Top Section (Method + URL + Send Button) */}
      <div className={styles.topSection}>
        <select 
          className={styles.methodSelect}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input 
          type="text" 
          placeholder="Enter URL" 
          className={styles.urlInput}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "headers" ? styles.activeTab : ""}
          onClick={() => setActiveTab("headers")}
        >
          Headers
        </button>
        <button
          className={activeTab === "body" ? styles.activeTab : ""}
          onClick={() => setActiveTab("body")}
        >
          Body
        </button>
      </div>

      {/* Fixed Size Content Area */}
      <div className={styles.content}>
        {activeTab === "headers" ? (
          <textarea 
            className={styles.inputBox} 
            placeholder="Enter headers (JSON format)..." 
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
          />
        ) : (
          <textarea 
            className={`${styles.inputBox} ${styles.bodyInput}`} 
            placeholder="Enter body (JSON format)..." 
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default RequestPanel;
