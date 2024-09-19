import React from 'react'
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface TreeProps {
  sourceData: SourceDataItem[]
}

const scopedClass = scopedClassMaker('ree-tree')
const sc = scopedClass

const RenderItem: React.FC<{item: SourceDataItem; level?: number}> = ({item, level = 1}) => {
  const classes = {
    ['level-' + level]: true,
    'item': true
  }
  return <div className={sc(classes)}>
    {item.text}
    {item.children?.map(item2 => {
      return <RenderItem key={item2.value} item={item2} level={level + 1} />
    })}
  </div>
}

const Tree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return <RenderItem key={item.value} item={item} />
      })}
    </div>
  )
}

export default Tree;