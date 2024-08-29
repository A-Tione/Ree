import React from 'react'
import {alert} from './dialogs'

export default function () {

  return (
    <div>
      <div>
        <h1>example 2(Alert)</h1>
        <button onClick={() => alert('Alert')}>alert</button>
      </div>
    </div>
  )
}