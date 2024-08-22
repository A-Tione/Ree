import * as React from 'react'

interface Props {
  code: string;
  children: React.ReactNode;
}

const Demo: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.children}
      <pre>
        {props.code}
      </pre>
    </div>
  )
}

export default Demo;