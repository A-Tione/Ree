import React from 'react'
import Button from './button'

const ButtonExample5: React.FunctionComponent = () => {

  return (
    <div>
      <h1>示例5</h1>
      <div>
        <Button loading>加载中</Button>
        <Button>加载完毕</Button>
      </div>
    </div>
  )
}

export default ButtonExample5
