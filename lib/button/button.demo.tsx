import ButtonExample1 from "./button.example.1";
import ButtonExample2 from "./button.example.2";
import ButtonExample3 from "./button.example.3";
import ButtonExample4 from "./button.example.4";
import ButtonExample5 from "./button.example.5";
import React from "react";
import Demo from '../../demo'

const ButtonExample = () => {
  return (
    <>
      <Demo code={require('!!raw-loader!./button.example.1.tsx').default}>
        <ButtonExample1/>
      </Demo>
      <Demo code={require('!!raw-loader!./button.example.2.tsx').default}>
        <ButtonExample2/>
      </Demo>
      <Demo code={require('!!raw-loader!./button.example.3.tsx').default}>
        <ButtonExample3/>
      </Demo>
      <Demo code={require('!!raw-loader!./button.example.4.tsx').default}>
        <ButtonExample4/>
      </Demo>
      <Demo code={require('!!raw-loader!./button.example.5.tsx').default}>
        <ButtonExample5/>
      </Demo>
    </>
  )
}

export default ButtonExample;
