import * as React from 'react';
import Form from './form';
import {useState} from 'react'
import Validator, {noError} from './validator'
import Button from '../button/button'

const usernames = ['atione', 'atione1', 'jack']

const checkUserName = (username: string, successful: () => void, fail: () => void) => {
  setTimeout(() => {
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
  const validator = (username: string) => {
      return new Promise<string>((resolve, reject) => {
        checkUserName(username, () => resolve(''), () => reject('unique'))
      })
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'usename', required: true},
      {key: 'usename', minLength: 6, maxLength: 16},
      {key: 'usename', validator},
      {key: 'usename', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true},
      {key: 'password', validator},
    ]
    Validator(formData, rules, (errors) => {
      setErrors(errors)
      if (noError(errors)) {
        // 校验无错误
      }
    })
  }
  const transformError = (message: string) => {
    const map: any = {
      unique: '用户名已存在',
      required: '必填',
      minLength: '太短',
      maxLength: '太长',
      patternNotMatch: '格式不正确'
    }
    return map[message]
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
          errorsDisplayMode='first'
          errors={errors}
          transformError={transformError}
          onChange={(newValue) => setFormData(newValue)}
          onSubmit={onSubmit}
    />
  )
}

export default FormExample;