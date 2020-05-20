import React, { useState, useEffect } from "react";
import { List, Transition, Message } from "semantic-ui-react";
import "./Toast.css";

const Toast = ({ data, options }) => {
  const [visible, setVisible] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [header, setHeader] = useState();
  const [timeouts, setTimeouts] = useState([]);

  useEffect(() => {
    if (data) {
      var dismissTimeout = addToast(data);
    }

    return () => {
      dismissTimeout && clearTimeout(dismissTimeout);
    };
  }, [data]);

  useEffect(() => {
    console.log(`using effect for new timeout #${timeouts.length}`);
    let timeout;
    if (timeouts.length > 0) {
      timeout = setTimeout(() => {
        console.log("running timeout");
        var index = Math.max(timeouts.length - 1, 0);
        dismiss(timeouts[index]);
        var updatedTimeouts = [...timeouts];
        updatedTimeouts.splice(index, 1);
        setTimeouts([...updatedTimeouts]);
      }, 2000);
    }

    return () => timeout && clearTimeout(timeout);
  }, [timeouts]);

  const addToast = (data) => {
    if (!data) {
      return;
    }

    let timeout;
    var key = Date.now();

    if (!options?.requireDismiss) {
      setTimeouts([...timeouts, key]);
    }

    var updatedToasts = [...toasts, { key, ...data }];
    setToasts(updatedToasts);

    return timeout;
  };

  const getType = ({ type }) => (type ? { [type]: true } : {});

  const dismiss = (key) => {
    var updatedToasts = toasts.filter((x) => x.key != key);

    setToasts(updatedToasts);
  };

  return (
    <div className="toast-container">
      <Transition.Group duration={1000}>
        {toasts.map((toast, index) => (
          <ToastMessage toast={toast} dismiss={dismiss} getType={getType} />
          //   <Test />
        ))}
      </Transition.Group>
    </div>
  );
};

const Test = ({ className }) => (
  <div className={`${className} check`} key={Date.now()}>
    Yep
  </div>
);

const ToastMessage = ({ className, toast, dismiss, getType }) => {
  return (
    <Message
      key={toast.key}
      className={`${className} toast`}
      {...getType(toast)}
      onDismiss={() => dismiss(toast.key)}
      header={toast.header}
      content={toast.message ?? "Testing"}
    />
  );
};

export default Toast;
