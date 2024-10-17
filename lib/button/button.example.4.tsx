import React from 'react'
import Button from './button'

const ButtonExample4: React.FunctionComponent = () => {

  return (
    <div>
      <h1>示例4</h1>
      <div>
        <Button theme="button" disabled>默认按钮</Button>
        <Button theme="link" disabled>默认按钮</Button>
        <Button theme="text" disabled>默认按钮</Button>
      </div>
    </div>
  )
}

export default ButtonExample4
