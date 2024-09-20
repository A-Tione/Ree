import React from 'react'
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface TreeProps {
  sourceData: SourceDataItem[]
  selectedValues: string[];
  onChange: (item: SourceDataItem, bool: boolean) => void
}

const scopedClass = scopedClassMaker('ree-tree')
const sc = scopedClass

const RenderItem: React.FC<{
  item: SourceDataItem; 
  onChange: (item: SourceDataItem, bool: boolean) => void;
  selectedValues: string[], 
  level?: number
}> = ({item, onChange, selectedValues, level = 1}) => {
  const classes = {
    ['level-' + level]: true,
    'item': true
  }

  return <div className={sc(classes)}>
    <div className={sc('text')}>
      <input 
        type='checkbox' 
        onChange={ (e)=> onChange(item, e.target.checked)} 
        checked={!!selectedValues.find(value => value === item.value)}
      />
      {item.text}
    </div>
    {item.children?.map(item2 => {
      return <RenderItem key={item2.value} item={item2} onChange={onChange} selectedValues={selectedValues} level={level + 1} />
    })}
  </div>
}

const Tree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return <RenderItem key={item.value} item={item} onChange={props.onChange} selectedValues={props.selectedValues} />
      })}
    </div>
  )
}

export default Tree;