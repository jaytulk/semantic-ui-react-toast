const body = document.querySelector("body");

const showToast = (text) => {
  console.log("showing toast");
  var div = document.createElement(`div`);
  div.innerText = text;

  document.body.appendChild(div);
};

export const toastService = {
  success: (text) => {
    showToast(text);
  },
};
