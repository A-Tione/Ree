import FormExample1 from "./form.example.1";
import React from "react";
import Demo from '../../demo'

const FormDemo = () => {
  return (
    <>
      <Demo code={require('!!raw-loader!./form.example.1.tsx').default}>
        <FormExample1/>
      </Demo>
    </>
  )
}

export default FormDemo;
