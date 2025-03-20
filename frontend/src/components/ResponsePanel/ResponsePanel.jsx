import React from "react";
import styles from "./ResponsePanel.module.scss";

const ResponsePanel = ({ response }) => {
  const { status, body } = response || {};

  return (
    <div className={styles.responsePanel}>
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Status:</span>
        <span className={`${styles.statusCode} ${status >= 200 && status < 300 ? styles.success : styles.error}`}>
          {status || "No response yet"}
        </span>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.bodyLabel}>Response Body:</div>
        <div className={styles.bodyContent}>
          {body ? (
            <pre>{JSON.stringify(body, null, 2)}</pre>
          ) : (
            <div className={styles.noResponse}>No response body yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsePanel; 