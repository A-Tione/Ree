import * as React from 'react'
import { useState } from 'react';
import {Highlight, themes} from 'prism-react-renderer'

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
    <div>
      <div className='example'>
        {props.children}
      </div>
      <div>
        <button onClick={() => setCodeVisible(!codeVisible)}>Preview Code</button>
        {codeVisible && code}
      </div>
    </div>
  )
}

export default Demo;