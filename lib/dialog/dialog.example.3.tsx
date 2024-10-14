import React from 'react'
import {modal} from './dialogs'
import Button from '@/button/button'

export default function () {
  const openModal = () => {
    const close = modal(<h1>你好</h1>, [<Button onClick={() => close()}>close</Button>])
  }

  return (
    <div>
      <div>
        <h1>example 3(Modal)</h1>
        <Button level='important' onClick={openModal}>Modal</Button>
      </div>
    </div>
  )
}