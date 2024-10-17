import React from 'react'
import { ButtonHTMLAttributes } from 'react'
import classes from '../helpers/classes'
import './button.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'button' | 'link' | 'text'
  size?: 'big' | 'normal' | 'small'
  level?: 'main' | 'danger' | 'normal'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<Props> = ({
  theme = 'button',
  size = 'normal',
  level = 'normal',
  disabled = false,
  loading = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button 
      className={classes('ree-button', `ree-theme-${theme}`, `ree-size-${size}`, `ree-level-${level}`, className)}
      disabled={disabled}
      {...rest}
    >
      {loading && <div className="ree-loadingIndicator"></div>}
      {children}
    </button>
  )
}

export default Button;