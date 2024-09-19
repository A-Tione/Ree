import React from 'react'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface TreeProps {
  sourceData: SourceDataItem[]
}

const Tree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return <div>
          {item.text}
          {item.children && item.children.map(item2 => {
            return <div>{item2.text}</div>
          })}
        </div>
      })}
    </div>
  )
}

export default Tree;