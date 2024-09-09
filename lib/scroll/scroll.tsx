import * as React from 'react';
import { HTMLAttributes} from 'react'
import './scroll.scss'

interface Props extends HTMLAttributes<HTMLElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <div className='ree-scroll' {...rest}>
      <div className='ree-scroll-inner'>
        {children}
      </div>
    </div>
  )
}

export default Scroll;