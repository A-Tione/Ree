import React, {useState} from 'react'
import Dialog from './dialogs'

export default function () {
  const [x, setX] = useState(false)

  return (
    <div>
      <div>
        <h1>example 1(Dialog1)</h1>
        <button onClick={() => setX(!x)}>click</button>
        <Dialog visible={x} buttons={
          [
            <button onClick={() => {setX(false)}}>Confirm</button>,
            <button onClick={() => {setX(false)}}>Cancel</button>
          ]
        } onClose={() => {setX(false)}}>
          <strong>hi</strong>
        </Dialog>
      </div>
    </div>
  )
}