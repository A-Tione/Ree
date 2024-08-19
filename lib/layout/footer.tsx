import React from 'react'
import { scopedClassMaker } from '../helpers/classes'


interface Props extends React.HtmlHTMLAttributes<HTMLElement> {

}

const sc = scopedClassMaker('ree-layout')
const Footer: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props;
  return (
    <div className={sc('footer', {extra: className})} {...rest}>
      footer
    </div>
  )
}

export default Footer;