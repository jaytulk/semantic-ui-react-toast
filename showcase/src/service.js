const toasts = {};
let count = 1;
const showToast = (text) => {
  var toastKey = addToastToContainer(text);

  setTimeout(() => {
    console.log("removing toast", toastKey);
    removeToast(toastKey);
  }, 2000);
};

const addToastToContainer = (options) => {
  const container = getOrCreateContainer();
  const key = count++;
  const toastOptions = {
    key,
    ...options,
  };

  const toast = createToast(toastOptions);

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.toggle("active");
    toast.style.opacity = 1;
  }, 1);

  return key;
};

const createToast = (options) => {
  const toast = document.createElement("div");
  toast.className = `ui toast ${options.type} message appearing`;
  toast.innerText = options.text;
  toast.setAttribute("id", `toast${options.key}`);
  toast.style.opacity = 0;

  return toast;
};
const removeToast = (key) => {
  const container = document.body.querySelector(".toast-container");
  const toast = document.body.querySelector(`#toast${key}`);
  toast.classList.toggle("active");
  toast.style.opacity = 0;
  setTimeout(() => {
    container.removeChild(toast);
  }, 200);
};

const getOrCreateContainer = () => {
  let container = document.querySelector(".toast-container");

  if (!container) {
    console.log("creating container");
    container = document.createElement("div");
    container.classList.add("toast-container");
  }

  document.body.appendChild(container);

  return container;
};

const types = {
  error: "error",
  warning: "warning",
  success: "success",
  info: "info",
};

export const toastService = {
  success: (text) => {
    showToast({ type: types.success, text });
  },
  warning: (text) => {
    showToast({ type: types.warning, text });
  },
  error: (text) => {
    showToast({ type: types.error, text });
  },
  info: (text) => {
    showToast({ type: types.info, text });
  },
};
