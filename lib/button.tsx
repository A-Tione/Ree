
import React from 'react';

interface ButtonProps {
  name?: string;
}


const Button = (props: ButtonProps) => {
  return (
    <div>{props.name}</div>
  )
}

export default Button;