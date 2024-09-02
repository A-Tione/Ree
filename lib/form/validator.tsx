import {FormValue} from './form'

interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: {
    name: string,
    validate: (value: string) => Promise<void>
  }
}

interface OneError {
  message: string;
  promise?: Promise<any>
}

type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return value === undefined || value === null || value === ''
}

export function noError(errors: any) {
  return Object.keys(errors).length === 0;
}

const Validator = (formValue: FormValue, rules: FormRules, callback: (errorList: any) => void): void => {
  let errors: any = {}
  const addError = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(error)
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if(rule.validator) {
      const promise = rule.validator.validate(value)
      addError(rule.key, {message: rule.validator.name, promise})
    }
    if(rule.required && isEmpty(value)) {
      addError(rule.key, {message: 'required'})
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, {message: 'minLength'})
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, {message: 'maxLength'})
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key, {message: 'patternNotMatch'})
    }
  })
  
  const promiseList = flat(Object.values(errors))
  .filter(item => item.promise)
  .map(item => item.promise)

  Promise.allSettled(promiseList).then(results => {
    const hasRejected = results.some(result => result.status === 'rejected');
    
    const newErrors = fromEntries(
      Object.keys(errors).map(key => [
        key,
        errors[key].reduce((acc: string[], item: OneError) => {
          // 当至少有一个 Promise 失败或当前项没有 promise 时，添加 message 到数组
          if (hasRejected || !item.promise) {
            acc.push(item.message);
          }
          return acc;
        }, [])
      ])
    );
  
    console.log(hasRejected ? 'catch' : 'then', newErrors);
      
    callback(newErrors);
  });
}

function flat(array: Array<any>) {
  const result: OneError[] = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result.push(...array[i])
    } else {
      result.push(array[i])
    }
  }
  return result;
}

function fromEntries(array: Array<[string, string[]]>) {
  const result: {[key: string]: string[]} = {}
  for (let i =0; i < array.length; i++) {
    result[array[i][0]] = array[i][1]
  }
  return result
}

export default Validator;