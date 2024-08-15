import React, {useState} from 'react'
import Dialog, {alert} from './dialogs'

export default function () {
  const [x, setX] = useState(false)
  const [y, setY] = useState(false)

  return (
    <div>
      <div style={{position: 'relative', zIndex:10, border: '1px solid red'}}>
        <h1>example 1</h1>
        <button onClick={() => setX(!x)}>click</button>
        <Dialog visible={x} button={
          [
            <button onClick={() => {setX(false)}}>Confirm</button>,
            <button onClick={() => {setX(false)}}>Cancel</button>
          ]
        } onClose={() => {setX(false)}}>
          <strong>hi</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 2</h1>
        <button onClick={() => setY(!y)}>click</button>
        <Dialog visible={y} button={
          [
            <button onClick={() => {setY(false)}}>Confirm</button>,
            <button onClick={() => {setY(false)}}>Cancel</button>
          ]
        } onClose={() => {setY(false)}}>
          <strong>hi</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 3</h1>
        <button onClick={() => alert('Alert')}>alert</button>
      </div>
    </div>
  )
}