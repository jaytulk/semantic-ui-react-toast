import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { ToastContext, toastService } from "./Toast";
let count = 1;
const Page = () => {
  const [toast, setToast] = useContext(ToastContext);

  const submitForm = () => {
    //setToast(`Ahh ${count++}`);
    toastService.success();
  };

  return <Button onClick={submitForm}>Click</Button>;
};

export default Page;
