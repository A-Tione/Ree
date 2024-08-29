import React from 'react'
import {modal} from './dialogs'

export default function () {
  const openModal = () => {
    const close = modal(<h1>你好</h1>, [<button onClick={() => close()}>close</button>])
  }

  return (
    <div>
      <div>
        <h1>example 3(Modal)</h1>
        <button onClick={openModal}>Modal</button>
      </div>
    </div>
  )
}