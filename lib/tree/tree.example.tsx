import React, {useState} from 'react'
import Tree, {SourceDataItem} from './tree'

const TreeExample: React.FC = () => {
  const [array] = useState([
    {text: '1', value: '1', 
      children: [
      {text: '1.1', value: '1.1', children: [
        {text: '1.1.1', value: '1.1.1'}
      ]}
    ]},
    {text: '2', value: '2', 
      children: [
      {text: '2.1', value: '2.1'}
    ]}
  ])
  const [selectedValues, setSelectedValues] = useState(['1.1.1'])
  const onchange = (item: SourceDataItem, bool: boolean) => {
    if (bool) {
      setSelectedValues([...selectedValues, item.value])
    } else {
      setSelectedValues(selectedValues.filter(value => value !== item.value))
    }
  }

  return (
    <div>
      <h1>展示数据</h1>
      <Tree 
        sourceData={array}
        selectedValues={selectedValues} 
        onChange={onchange}
      />
    </div>
  )
}

export default TreeExample;