import React, {useState} from 'react'
import Dialog, {alert, modal, confirm} from './dialogs'

export default function () {
  const [x, setX] = useState(false)
  const [y, setY] = useState(false)
  const openModal = () => {
    const close = modal(<h1>你好</h1>, [<button onClick={() => close()}>close</button>])
  }

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
      <div>
        <h1>example 2(Dialog2)</h1>
        <button onClick={() => setY(!y)}>click</button>
        <Dialog visible={y} buttons={
          [
            <button onClick={() => {setY(false)}}>Confirm</button>,
            <button onClick={() => {setY(false)}}>Cancel</button>
          ]
        } onClose={() => {setY(false)}}>
          <strong>hi</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 3(Alert)</h1>
        <button onClick={() => alert('Alert')}>alert</button>
      </div>
      <div>
        <h1>example 4(Modal)</h1>
        <button onClick={openModal}>Modal</button>
      </div>
      <div>
        <h1>Example 5(Confirm)</h1>
        <button onClick={() => confirm(
            'Content',
            () => {console.log('Yes')}, 
            () => {console.log('No')}
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}