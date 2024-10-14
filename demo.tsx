import * as React from 'react'
import { useState } from 'react';
import {Highlight, themes} from 'prism-react-renderer'
import Button from '@/button/button';

interface Props {
  code: string;
  children: React.ReactNode;
}

const Demo: React.FunctionComponent<Props> = (props) => {
  const [codeVisible, setCodeVisible] = useState(false)
  const code = (
    <Highlight
    theme={themes.shadesOfPurple}
    code={props.code}
    language="tsx"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
  )
  return (
    <div style={{marginBottom: '60px'}}>
      <div style={{ padding: '10px', border: '1px solid #ddd' }}>
        <div className='example'>
          {props.children}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', padding: '10px', border: '1px solid #ddd', borderTop: 'none' }}>
        <Button onClick={() => setCodeVisible(!codeVisible)} style={{ marginTop: '10px', marginBottom: '8px' }}>{codeVisible ? 'Hide Code' : 'Show Code'}</Button>
        {codeVisible && code}
      </div>
    </div>
  )
}

export default Demo;