import React from 'react'
import TreeItem from './tree-item'
import './tree.scss'

const Tree: React.FC<TreeProps> = (props) => {
  const onItemChange = (values: string[] | string) => {
    if(props.multiple) {
      props.onChange(Array.from(new Set(values)) as string[])
    } else {
      props.onChange(values as string)
    }
  }
    return (
      <div>
        {props.sourceData?.map(item => 
          <TreeItem key={item.value} onItemChange={onItemChange} treeProps={props} item={item} level={1} />
        )}
      </div>
    )
}

export default Tree;