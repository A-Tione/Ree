import React, {useState} from 'react'
import Dialog from './dialogs'
import Button from '@/button/button'

export default function () {
  const [x, setX] = useState(false)

  return (
    <div>
      <div>
        <h1>example 1(Dialog1)</h1>
        <Button level='important' onClick={() => setX(!x)}>Click</Button>
        <Dialog visible={x} buttons={
          [
            <Button onClick={() => {setX(false)}}>Confirm</Button>,
            <Button onClick={() => {setX(false)}}>Cancel</Button>
          ]
        } onClose={() => {setX(false)}}>
          <strong>hi</strong>
        </Dialog>
      </div>
    </div>
  )
}