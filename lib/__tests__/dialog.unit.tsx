import React, {useState} from 'react'
import {render} from "@testing-library/react";
import '@testing-library/jest-dom'
import Dialog, {alert, confirm, modal} from '../dialog/dialogs'

jest.mock('../icon/importIcons', () => {
  return {
    context: () => {
      const keys = () => [];
      const module = (key: string) => null;
      return {
        keys,
        module,
      };
    }
  };
});

interface WrapperComponentProps {
  initialVisible?: boolean;
  text: string;
}

describe('Dialog', () => {
  const WrapperComponent: React.FC<WrapperComponentProps> = ({ initialVisible = false, text }) => {
    const [x, setX] = useState(initialVisible);
    return (
      <Dialog
        visible={x}
        buttons={[
          <button onClick={() => setX(false)}>Confirm</button>,
          <button onClick={() => setX(false)}>Cancel</button>,
        ]}
        onClose={() => setX(false)}
      >
        <strong>{text}</strong>
      </Dialog>
    );
  };
    it('是个 dialog', () => {
      const { queryByText } = render(<WrapperComponent text={'hihi'} />);
      expect(queryByText('hihi')).toBeNull();
    })
    it('可以接受 visible', () => {
      const { queryByText } = render(<WrapperComponent initialVisible={true} text={'visible'} />);
      expect(queryByText('visible')).toBeInTheDocument();
    })
    // it('可以使用 alert', () => { 
    //     const close = alert('Alert')
    //     expect(close).toBeInstanceOf(Function)
    // })
    // it('可以使用 confirm', () => {
    //   const {queryByText} = render(confirm('Content', () => {}, () => {}))
    // })
    it('可以使用 modal', () => {
        const close = modal(<h1>你好</h1>, [<button onClick={() => close()}>close</button>])
        expect(close).toBeInstanceOf(Function)
    })
})