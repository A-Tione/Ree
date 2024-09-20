import React from 'react'
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type TreeProps = {
  sourceData: SourceDataItem[],
  onChange: (item: SourceDataItem, bool: boolean) => void
}
& ({selected: string[], multiple: true} | {selected: string, multiple?: false})

const scopedClass = scopedClassMaker('ree-tree')
const sc = scopedClass

const Tree: React.FC<TreeProps> = (props) => {
  const renderItem = (item: SourceDataItem, level = 1) => {
    const classes = {
      ['level-' + level]: true,
      'item': true
    }
    const checked = props.multiple ? props.selected.indexOf(item.value) >= 0 : props.selected === item.value
  
    return <div key={item.value} className={sc(classes)}>
      <div className={sc('text')}>
        <input 
          type='checkbox' 
          onChange={ (e)=> props.onChange(item, e.target.checked)} 
          checked={checked}
        />
        {item.text}
      </div>
      {item.children?.map(item2 => {
        return renderItem(item2)
      })}
    </div>
  }
    return (
      <div>
        {props.sourceData.map(item => {
          return renderItem(item)
        })}
      </div>
    )
}

export default Tree;