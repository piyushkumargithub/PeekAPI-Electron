import { useEffect, useState } from "react";
import RequestPanel from "./components/RequestPanel/RequestPanel";
import ResponsePanel from "./components/ResponsePanel/ResponsePanel";
import CollectionsPanel from "./components/CollectionsPanel/CollectionsPanel";
import "./styles.scss";

function App() {
  const [response, setResponse] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="app-container">
      <div className="collections-panel">
        <CollectionsPanel onRequestSelect={handleRequestSelect} />
      </div>
      <div className="main-content">
        <RequestPanel 
          onResponse={setResponse} 
          selectedRequest={selectedRequest}
        />
        <ResponsePanel response={response} />
      </div>
    </div>
  );
}

export default App;