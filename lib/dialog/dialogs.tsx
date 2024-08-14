import React, {ReactElement, ReactNode} from 'react'
import './dialog.style.scss'
import {Icon} from '../index'
import { scopedClassMaker } from '../../lib/classes'
import ReactDOM from 'react-dom'

interface Props {
  visible: boolean;
  button?: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
  children?: ReactNode;
}

const scopedClass = scopedClassMaker('ree-dialog')
const sc = scopedClass

const Dialog: React.FC<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e)
  }
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e)
    }
  }
  const content = props.visible ? 
    <>
      <div className={sc('mask')} onClick={onClickMask}></div>
      <div className={sc()}>
        <div className={sc('close')} onClick={onClickClose}>
          <Icon name="close"/>
        </div>
        <header className={sc('header')}>
          提示
        </header>
        <main className={sc('main')}>
          {props.children}
        </main>
        <footer className={sc('footer')}>
          {props.button && props.button.map((button, index) =>
            React.cloneElement(button, {key: index})
          )}
        </footer>
      </div>
    </> 
    : 
    null;
    return ReactDOM.createPortal(content, document.body)
}

Dialog.defaultProps = {
  closeOnClickMask: false
}

export default Dialog;