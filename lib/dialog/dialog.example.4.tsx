import React from 'react'
import {confirm} from './dialogs'
import Button from '@/button/button'

export default function () {

  return (
    <div>
      <div>
        <h1>Example 4(Confirm)</h1>
        <Button level='main' onClick={() => confirm(
            'Content',
            () => {console.log('Yes')}, 
            () => {console.log('No')}
          )}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}