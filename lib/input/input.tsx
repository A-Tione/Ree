import React from 'react'
import { InputHTMLAttributes } from 'react'
import classes from '../helpers/classes'
import './input.scss'


interface Props extends InputHTMLAttributes<HTMLElement> {

}

const Input: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props;
  return (
    <input className={classes('ree-input', className)} {...rest}>
      {props.children}
    </input>
  )
}

export default Input;