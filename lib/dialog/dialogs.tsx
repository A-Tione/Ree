import React, {ReactElement, ReactNode} from 'react'
import './dialog.style.scss'
import {Icon} from '../index'
import { scopedClassMaker } from '../helpers/classes'
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'

interface Props {
  visible: boolean;
  buttons?: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
  children?: ReactNode;
}

const scopedClass = scopedClassMaker('ree-dialog')
const sc = scopedClass

const Dialog: React.FC<Props> = ({
  visible,
  buttons,
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
      <div className={sc('')}>
        <div className={sc('close')} onClick={onClickClose}>
          <Icon name="close"/>
        </div>
        <header className={sc('header')}>
          提示
        </header>
        <main className={sc('main')}>
          {children}
        </main>
        { buttons && buttons.length > 0 && 
          <footer className={sc('footer')}>
            {buttons && buttons.map((btn, index) =>
              React.cloneElement(btn, {key: index})
            )}
          </footer>
        }
      </div>
    </> 
    : 
    null;
    return ReactDOM.createPortal(content, document.body)
}


const modal = (content: ReactNode, buttons?: ReactElement[], afterClose?: () => void) => {
  const close = () => {
    root.unmount()
  }
  const component = 
  <Dialog 
  visible={true} 
  buttons={buttons}
  onClose={()=> {
    root.unmount()
    div.remove()
  }}>
      {content}
    </Dialog>
  const div = document.createElement('div')
  const root = createRoot(div)  
  root.render(component)
  
  return close;
}

const alert = (content: string) => {
  const button = <button onClick={() => close()}>OK</button>
  const close = modal(content, [button])
}

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const buttons = [
    <button onClick={() => {close(), yes &&yes()}}>Yes</button>,
    <button onClick={() => {close(), no && no()}}>No</button>
  ]
  const close = modal(content, buttons)
}

export {alert, modal, confirm}

export default Dialog;