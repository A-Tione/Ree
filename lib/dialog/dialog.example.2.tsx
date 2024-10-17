import React from 'react'
import {alert} from './dialogs'
import Button from '@/button/button'

export default function () {

  return (
    <div>
      <div>
        <h1>example 2(Alert)</h1>
        <Button level='main' onClick={() => alert('Alert')}>alert</Button>
      </div>
    </div>
  )
}