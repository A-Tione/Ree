import React from 'react'
import { ButtonHTMLAttributes } from 'react'
import classes from '../helpers/classes'
import './button.scss'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'important' | 'danger' | 'normal'
}

const Button: React.FunctionComponent<Props> = ({
  level = 'normal',
  className,
  children,
  ...rest
} ) => {
  return (
    <button className={classes('ree-button', `ree-button-${level}`, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button;