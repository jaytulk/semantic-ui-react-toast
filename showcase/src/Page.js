import React from "react";
import { Button } from "semantic-ui-react";

import { toastService } from "./service";

let count = 1;

const Page = () => {
  const submitForm = (type) => {
    toastService[type](count++);
  };

  return (
    <div>
      <Button onClick={() => submitForm("success")}>Click for success</Button>
      <br />
      <br />
      <Button onClick={() => submitForm("error")}>Click for error</Button>
      <br />
      <br />
      <Button onClick={() => submitForm("warning")}>Click for warning</Button>
      <br />
      <br />
      <Button onClick={() => submitForm("info")}>Click for info</Button>
      <br />
    </div>
  );
};

export default Page;
