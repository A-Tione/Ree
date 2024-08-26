import IconExample1 from "./icon.example.1";
import IconExample2 from "./icon.example.2";
import IconExample3 from "./icon.example.3";
import React from "react";
import Demo from '../../demo'

const IconDemo = () => {
  return (
    <>
      <Demo code={require('!!raw-loader!./icon.example.1.tsx').default}>
        <IconExample1/>
      </Demo>
      <Demo code={require('!!raw-loader!./icon.example.2.tsx').default}>
        <IconExample2/>
      </Demo>
      <Demo code={require('!!raw-loader!./icon.example.3.tsx').default}>
        <IconExample3/>
      </Demo>
    </>
  )
}

export default IconDemo;
