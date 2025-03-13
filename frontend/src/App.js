import { useEffect, useState } from "react";
import RequestPanel from "./components/RequestPanel/RequestPanel";
import "./styles.scss";

function App() {
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <RequestPanel />
    </div>
  );
}

export default App;
