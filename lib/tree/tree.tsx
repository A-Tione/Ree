import React, { ChangeEventHandler } from 'react'
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type TreeProps = {
  sourceData: SourceDataItem[],
} & ({multiple: true, selected: string[], onChange: (values: string[]) => void} 
    | {multiple?: false, selected: string, onChange: (values: string) => void})

const scopedClass = scopedClassMaker('ree-tree')
const sc = scopedClass

const Tree: React.FC<TreeProps> = (props) => {
  const renderItem = (item: SourceDataItem, level = 1) => {
    const classes = {
      ['level-' + level]: true,
      'item': true
    }
    const checked = props.multiple ? props.selected.indexOf(item.value) >= 0 : props.selected === item.value
    const onChange: ChangeEventHandler<{checked: boolean}> = (e) => {
      if(props.multiple) {
        if(e.target.checked) {
          props.onChange([...props.selected, item.value])
        } else {
          props.onChange(props.selected.filter(value => value !== item.value))
        }
      } else {
        props.onChange(item.value)
      }
    }
  
    return <div key={item.value} className={sc(classes)}>
      <label className={sc('text')}>
        <input 
          type='checkbox' 
          onChange={onChange} 
          checked={checked}
        />
        {item.text}
      </label>
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