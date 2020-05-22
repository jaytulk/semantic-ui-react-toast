import React, { createContext, useState, useEffect } from "react";
import { List, Transition, Message } from "semantic-ui-react";
import "./Toast.css";

const addToast = () => {};

const dismissToast = () => {};

export const toastService = {
  error: () => {},
  info: () => {},
  success: () => {
    var container = document.createElement("div");
    container.setAttribute("id", "toastContainer");
    container.className = "toast-container appearing";
    container.innerHTML = `
    <div class="ui icon tiny message">
    <i class="inbox icon" style="font-size: 1.5em"></i>
    <div class="content">
    <p>Get the best news in your e-mail every day.</p>
    </div>
    </div>
    `;

    document.body.appendChild(container);

    setTimeout(() => {
      container.classList.replace("appearing", "disappearing");
      setTimeout(() => {
        const toast = document.querySelector("#toastContainer");
        document.body.removeChild(toast);
      }, 501);
    }, 2500);
  },
  warning: () => {},
};

export const ToastContext = createContext();
const getType = ({ type }) => (type ? { [type]: true } : {});

export const ToastContextProvider = (props) => {
  const [toast, setToast] = useState();
  const [toasts, setToasts] = useState([]);
  const [timeouts, setTimeouts] = useState(toasts);

  useEffect(() => {
    if (toast) {
      let formattedToast = {};

      if (typeof toast === "object") {
        formattedToast = { ...toast, key: Date.now() };
      } else if (typeof toast === "string") {
        formattedToast = { message: toast, key: Date.now() };
      }

      var updatedToasts = [...toasts, formattedToast];
      setToasts(updatedToasts);
    }

    setToast();
  }, [toast]);

  useEffect(() => {
    if (toasts.length > 0) {
      const toastToDismiss = toasts[toasts.length - 1];
      const dismissFunction = () => {
        setToasts(toasts.filter((x) => x.key != toastToDismiss.key));
      };

      const timeout = setTimeout(dismissFunction, 1000);

      const updatedTimeouts = { ...timeouts, [timeout]: () => dismissFunction };

      setTimeouts(updatedTimeouts);
    }
  }, [toasts]);

  useEffect(() => {
    return () => {
      Object.keys(timeouts).forEach((x) => clearTimeout(x));
    };
  }, []);

  const dismiss = (key) => {
    var updatedToasts = toasts.filter((x) => x.key != key);

    setToasts(updatedToasts);
  };

  return (
    <ToastContext.Provider value={[toast, setToast]}>
      <div className="toast-container">
        <Transition.Group duration={1000}>
          {toasts.map((toast, index) => (
            <ToastMessage key={toast.key} toast={toast} dismiss={dismiss} />
          ))}
        </Transition.Group>
      </div>
      {props.children}
    </ToastContext.Provider>
  );
};

const ToastProvider = React.createContext({});

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

const ToastMessage = ({ className, toast, dismiss }) => {
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
