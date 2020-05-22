import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";

import Toast, { ToastContextProvider } from "./Toast";
import Page from "./Page";
let count = 1;
function App() {
  const [showToast, setShowToast] = useState(false);
  //const [toast, setToast] = useState({});

  const setToast = () => {
    //toastService.success("Testing");
  };

  return (
    <ToastContextProvider>
      <div className="App">
        <header>Test</header>
        <Message>Test</Message>
        <Page />
      </div>
    </ToastContextProvider>
  );
}

export default App;
