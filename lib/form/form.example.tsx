import * as React from 'react';
import Form from './form';
import {useState} from 'react'
import Validator, {noError} from './validator'
import Button from '../button/button'

const usernames = ['atione', 'atione1', 'jack']

const checkUserName = (username: string, successful: () => void, fail: () => void) => {
  setTimeout(() => {
    console.log('checkUserName');
    if (usernames.indexOf(username) >= 0) {
      fail()
    } else {
      successful()
    }
  }, 2000)
}

const FormExample: React.FunctionComponent = () => {
  const [fields] = useState([
    {name: 'usename', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}}
  ])
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    usename: 'atione',
    password: ''
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'usename', required: true},
      {key: 'usename', minLength: 6, maxLength: 16},
      {key: 'usename', validator: {
        name: 'unique',
        validate(username: string) {
          console.log('有人调用validate了');
          return new Promise<void>((resolve, reject) => {
            checkUserName(username, resolve, reject)
          })
        }}
      },
      {key: 'usename', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true}
    ]
    Validator(formData, rules, (errors) => {
      console.log(errors);
      setErrors(errors)
      if (noError(errors)) {
        console.log('校验成功');
        
      }
    })
  }

  return (
    <Form value={formData} 
          fields={fields}
          buttons={
            <>
              <Button type='submit'>Submit</Button>
              <Button>Back</Button>
            </>
          }
          errorsDisplayMode='all'
          errors={errors}
          onChange={(newValue) => setFormData(newValue)}
          onSubmit={onSubmit}
    />
  )
}

export default FormExample;