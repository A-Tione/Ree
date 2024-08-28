import * as React from 'react';
import Form from './form';
import {useState} from 'react'
import Validator from './validator'
import Button from '../button/button'

const FormExample: React.FunctionComponent = () => {
  const [fields] = useState([
    {name: 'usename', label: '用户登录名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}}
  ])
  const [errors] = useState({});
  const [formData, setFormData] = useState({
    usename: 'atione',
    password: ''
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'usename', required: true},
      {key: 'usename', minLength: 6, maxLength: 16},
      {key: 'usename', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true}
    ]
    const errors = Validator(formData, rules)
    console.log(errors, 'errors');
  }

  return (
    <Form value={formData} fields={fields}
          buttons={
            <>
              <Button type='submit'>Submit</Button>
              <Button>Back</Button>
            </>
          }
          errors={errors}
          onChange={(newValue) => setFormData(newValue)}
          onSubmit={onSubmit}
    />
  )
}

export default FormExample;