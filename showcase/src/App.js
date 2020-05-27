import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import "./Toast.css";
import "./App.css";

import { toastService } from "./service";

const toastTypeOptions = [
  { key: "showToast", value: "showToast", text: "Default" },
  { key: "error", value: "error", text: "Error" },
  { key: "info", value: "info", text: "Info" },
  { key: "success", value: "success", text: "Success" },
  { key: "warning", value: "warning", text: "Warning" },
];

const defaultSettings = {
  toastType: "showToast",
  toastText: "This is a toast!",
  toastHeader: "",
  showIcon: true,
  closeable: false,
};

const App = () => {
  const [toastType, setToastType] = useState(defaultSettings.toastType);
  const [toastText, setToastText] = useState(defaultSettings.toastText);
  const [toastHeader, setToastHeader] = useState(defaultSettings.toastHeader);
  const [showIcon, setShowIcon] = useState(defaultSettings.showIcon);
  const [closeable, setCloseable] = useState(defaultSettings.closeable);

  const resetToDefaults = () => {
    setToastType(defaultSettings.toastType);
    setToastText(defaultSettings.toastText);
    setToastHeader(defaultSettings.toastHeader);
    setShowIcon(defaultSettings.showIcon);
    setCloseable(defaultSettings.closeable);
  };

  const showToast = () => {
    toastService[toastType](toastText, {
      header: toastHeader,
      closeable,
      showIcon,
    });
  };

  return (
    <div className="app-container">
      <Form>
        <Form.Input
          id="headerTextInput"
          label="Header Text"
          value={toastHeader}
          placeholder="Enter header text (optional)"
          onChange={(_, { value }) => setToastHeader(value)}
        />
        <Form.Input
          label="Body Text/HTML"
          id="bodyTextInput"
          placeholder="Enter body text/HTML (recommended)"
          value={toastText}
          onChange={(_, { value }) => setToastText(value)}
        />
        <Form.Select
          id="toastTypeSelect"
          label="Toast Type"
          options={toastTypeOptions}
          value={toastType}
          onChange={(_, { value }) => setToastType(value)}
        />
        <Form.Checkbox
          checked={showIcon}
          onChange={(e, { checked }) => setShowIcon(checked)}
          label="Show Icon"
        />
        <Form.Group>
          <Form.Button basic type="button" onClick={resetToDefaults}>
            Reset
          </Form.Button>
          <Form.Button onClick={showToast}>Show Toast</Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default App;
