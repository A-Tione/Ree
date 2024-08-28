import * as React from 'react'
import Input from '../input/input'
import classes from '../helpers/classes'
import './form.scss'

export interface FormValue {
  usename: string;
  password: string;
  [key: string]: any;
}

interface Props {
  value: FormValue,
  fields: Array<{name: string, label: string, input: {type: string}}>
  buttons: React.ReactNode;
  onChange: (value: FormValue) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>
  errors: { [K: string]: string[] }
}


const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  }
  const onInputChange = (name:string, value: string) => {
    props.onChange({...formData, [name]: value})
  }
  return (
    <form onSubmit={onSubmit}>
      <table>
        <tbody>
          {props.fields.map(f => 
          <tr className={classes('ree-form-tr')} key={f.name}>
            <td className='ree-form-td'>
              <span className='ree-form-label'>{f.label}</span>
            </td>
            <td className='ree-form-td'>
              <Input 
                type={f.input.type}
                className='ree-form-input'
                value={props.value[f.name]} 
                onChange={(e) => onInputChange(f.name, (e.target as HTMLInputElement).value)} 
                />
              <div className='ree-form-error'>
                {props.errors[f.name]}
              </div>
            </td>
          </tr>
          )}
          <tr className='ree-form-tr'>
            <td className='ree-form-td'/>
            <td className='ree-form-td'>
              {props.buttons}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Form;