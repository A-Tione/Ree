import React, { ReactNode } from 'react'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface TreeProps {
  sourceData: SourceDataItem[]
}

const RenderItem = ({item}: {item: SourceDataItem}) => {
  return <div>
    {item.text}
    {item.children?.map((item2, index) => {
      return <RenderItem key={index} item={item2} />
    })}
  </div>
}

const Tree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData.map((item, index) => {
        return <RenderItem key={index} item={item} />
      })}
    </div>
  )
}

export default Tree;