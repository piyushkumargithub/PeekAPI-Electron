import React, { useState } from "react";
import styles from "./RequestPanel.module.scss";

const RequestPanel = () => {
  const [activeTab, setActiveTab] = useState("headers");

  return (
    <div className={styles.requestPanel}>
      {/* Top Section (Method + URL + Send Button) */}
      <div className={styles.topSection}>
        <select className={styles.methodSelect}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input type="text" placeholder="Enter URL" className={styles.urlInput} />
        <button className={styles.sendButton}>Send</button>
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
          <textarea className={styles.inputBox} placeholder="Enter headers..." />
        ) : (
          <textarea className={`${styles.inputBox} ${styles.bodyInput}`} placeholder="Enter body..." />
        )}
      </div>
    </div>
  );
};

export default RequestPanel;
