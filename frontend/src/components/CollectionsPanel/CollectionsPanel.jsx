import React, { useState } from "react";
import styles from "./CollectionsPanel.module.scss";

const CollectionsPanel = ({ onRequestSelect }) => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "My Collection",
      requests: [
        { id: 1, name: "Get Users", method: "GET", url: "https://api.example.com/users" },
        { id: 2, name: "Create User", method: "POST", url: "https://api.example.com/users" }
      ]
    }
  ]);

  const [expandedCollection, setExpandedCollection] = useState(1);

  const toggleCollection = (collectionId) => {
    setExpandedCollection(expandedCollection === collectionId ? null : collectionId);
  };

  const handleRequestClick = (request) => {
    onRequestSelect(request);
  };

  return (
    <div className={styles.collectionsPanel}>
      <div className={styles.header}>
        <h2>Collections</h2>
        <button className={styles.addButton}>+</button>
      </div>
      
      <div className={styles.collectionsList}>
        {collections.map((collection) => (
          <div key={collection.id} className={styles.collection}>
            <div 
              className={styles.collectionHeader}
              onClick={() => toggleCollection(collection.id)}
            >
              <span className={styles.arrow}>
                {expandedCollection === collection.id ? "▼" : "▶"}
              </span>
              <span className={styles.collectionName}>{collection.name}</span>
            </div>
            
            {expandedCollection === collection.id && (
              <div className={styles.requestsList}>
                {collection.requests.map((request) => (
                  <div 
                    key={request.id} 
                    className={styles.requestItem}
                    onClick={() => handleRequestClick(request)}
                  >
                    <span className={`${styles.method} ${styles[request.method.toLowerCase()]}`}>
                      {request.method}
                    </span>
                    <span className={styles.requestName}>{request.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPanel; 