import React from 'react'
import Button from './button'

const ButtonExample1: React.FunctionComponent = () => {
  const onClick = () => {
    console.log('onClick')
  }

  return (
    <div>
      <div>Button 示例</div>
      <h1>示例1</h1>
      <div>
        <Button onClick={onClick} className="test">默认按钮</Button>
        <Button theme="button">默认按钮</Button>
        <Button theme="link">默认按钮</Button>
        <Button theme="text">默认按钮</Button>
      </div>
    </div>
  )
}

export default ButtonExample1
