import React from 'react'
import {confirm} from './dialogs'

export default function () {

  return (
    <div>
      <div>
        <h1>Example 4(Confirm)</h1>
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