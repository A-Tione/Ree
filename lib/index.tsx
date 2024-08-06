import React from "react";
import { createRoot } from "react-dom/client";
import Icon from "./icon/icon";

const fn: React.MouseEventHandler<SVGElement> = (e) => {
  console.log(e.target);
}

const ContainerBox = () => {
  return (
      <>
        <Icon name='wechat' />
        <Icon name='apple' />
        <Icon 
          name='apple' 
          className='testClassName' 
          onClick={fn}
          onMouseEnter={() => console.log('enter')}
          onMouseLeave={() => console.log('leave')}
        />
      </>
  )
}

const root = document.getElementById("root")

if (root !== null) {
  createRoot(root).render(<ContainerBox />);
} else {
  console.error('root not found');
}

