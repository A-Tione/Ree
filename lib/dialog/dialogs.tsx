import React, {ReactElement, ReactNode} from 'react'
import './dialog.style.scss'
import {Icon} from '../index'
import { scopedClassMaker } from '../../lib/classes'
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'

interface Props {
  visible: boolean;
  button?: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
  children?: ReactNode;
}

const scopedClass = scopedClassMaker('ree-dialog')
const sc = scopedClass

const Dialog: React.FC<Props> = ({
  visible,
  button,
  onClose,
  closeOnClickMask = false,
  children
}) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    onClose(e)
  }
  const onClickMask: React.MouseEventHandler = (e) => {
    if (closeOnClickMask) {
      onClose(e)
    }
  }
  const content = visible ? 
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
          {children}
        </main>
        <footer className={sc('footer')}>
          {button && button.map((btn, index) =>
            React.cloneElement(btn, {key: index})
          )}
        </footer>
      </div>
    </> 
    : 
    null;
    return ReactDOM.createPortal(content, document.body)
}

const alert = (content: string) => {
  const div = document.createElement('div')
  document.body.append(div)
  const root = createRoot(div)
  const component = <Dialog visible={true} onClose={()=> {
    root.unmount()
    div.remove()
  }}>{content}</Dialog>
  root.render(component)
}

// const confirm = () => {}

// const modal = () => {}

export {alert}

export default Dialog;