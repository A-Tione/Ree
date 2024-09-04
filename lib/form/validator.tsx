import {FormValue} from './form'

interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: (value: string) => Promise<string>
}

type OneError = string | Promise<string>

interface Errors {
  [K: string]: OneError[]
}

type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return value === undefined || value === null || value === ''
}

export function noError(errors: any) {
  return Object.keys(errors).length === 0;
}

const Validator = (formValue: FormValue, rules: FormRules, callback: (errorList: any) => void): void => {
  let errors: Errors = {}
  const addError = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(error)
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if(rule.validator) {
      const promise = rule.validator(value)
      addError(rule.key, promise)
    }
    if(rule.required && isEmpty(value)) {
      addError(rule.key, 'required')
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, 'minLength')
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, 'maxLength')
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key, 'patternNotMatch')
    }
  })
  
  const flattenErrors = Object.keys(errors).map(key => 
    errors[key].map((promise): [string, OneError] => [key, promise])
  ).flat();
  
  const newPromise = flattenErrors.map(([key, promiseOrString]) => (
    promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString))
    .then(() => [key, undefined], (reason: string) => [key, reason]))
    
  Promise.all(newPromise).then(results => {
    const filtered = results.filter(r => r[1] !== undefined) as Array<[key: string, key: string]>
    callback(zip(filtered))
  })

}

function zip(array: Array<[string, string]>) {
  const result: any = {}
  array.map(([key, value]) => {
    result[key] = result[key] || []
    result[key].push(value)
  })
  return result
}

export default Validator;