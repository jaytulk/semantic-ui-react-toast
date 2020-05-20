import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import Toast from "./Toast";
let count = 1;
function App() {
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  return (
    <div className="App">
      <header>Test</header>
      <Button
        onClick={() =>
          setToast({
            message: `Item ${count++}`,
            header: "Testing",
            type: "warning",
          })
        }
      >
        Click
      </Button>
      <Toast data={toast} />
    </div>
  );
}

export default App;
