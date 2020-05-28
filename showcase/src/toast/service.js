const types = {
  error: "error",
  warning: "warning",
  success: "success",
  info: "info",
};

const icons = {
  [types.error]: "exclamation triangle",
  [types.info]: "question",
  [types.success]: "check",
  [types.warning]: "exclamation triangle",
};

const showToast = (text) => {
  const toastKey = addToastToContainer(text);
  trackAndRemoveToast(toastKey);
};

const trackAndRemoveToast = (key) => {
  const container = document.body.querySelector(".toast-container");
  const toast = document.body.querySelector(`#toast${key}`);

  setTimeout(() => {
    if (!toast.matches(":hover")) {
      toast.classList.toggle("active");
      toast.style.opacity = 0;

      setTimeout(() => {
        container.removeChild(toast);
      }, 200);
    } else {
      trackAndRemoveToast(key);
    }
  }, 2000);
};

const addToastToContainer = (options) => {
  const container = getOrCreateContainer();

  const toastOptions = {
    key: Date.now(),
    ...options,
  };

  const toast = createToast(toastOptions);

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.toggle("active");
    toast.style.opacity = 1;
  }, 1);

  return toastOptions.key;
};

const createToast = (options) => {
  const icon =
    options.showIcon && icons[options.type] ? icons[options.type] : "";

  const toast = document.createElement("div");

  toast.className = `ui ${options.type} ${
    !!icon ? "icon" : ""
  } message active toast`;

  const header = options.header
    ? `<div class="header">${options.header}</div>`
    : "";

  const body = options.text ? `<p>${options.text}</p>` : "";

  const toastIcon = icon
    ? `<i aria-hidden="true" class="${icon} icon"></i>`
    : "";

  const closeIcon = options.closeable ? '<i class="close icon" ></i>' : "";
  const nestContent = !!icon || !!header;

  toast.innerHTML = `${toastIcon} ${
    nestContent ? '<div class="content">' : ""
  } ${closeIcon} ${header} ${body}${nestContent ? "</div>" : ""}`;

  toast.setAttribute("id", `toast${options.key}`);
  toast.style.opacity = 0;

  return toast;
};

const getOrCreateContainer = () => {
  let container = document.querySelector(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container");
  }

  document.body.appendChild(container);

  return container;
};

export const toastService = {
  showToast: (text, options = {}) => {
    showToast({ ...options, type: "", text });
  },
  success: (text, options = {}) => {
    showToast({ ...options, type: types.success, text });
  },
  warning: (text, options = {}) => {
    showToast({ ...options, type: types.warning, text });
  },
  error: (text, options = {}) => {
    showToast({ ...options, type: types.error, text });
  },
  info: (text, options = {}) => {
    showToast({ ...options, type: types.info, text });
  },
};
