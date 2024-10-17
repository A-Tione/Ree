import React from 'react'
import Button from './button'

const ButtonExample2: React.FunctionComponent = () => {

  return (
    <div>
      <h1>示例2</h1>
      <div>
        <Button size="big">大大大</Button>
        <Button>普普通</Button>
        <Button size="small">小小小</Button>
      </div>
      <div>
        <Button theme="link" size="big">大大大</Button>
        <Button theme="link">普普通</Button>
        <Button size="small" theme="link">小小小</Button>
      </div>
      <div>
        <Button size="big" theme="text">大大大</Button>
        <Button theme="text">普普通</Button>
        <Button size="small" theme="text">小小小</Button>
      </div>
    </div>
  )
}

export default ButtonExample2
