import React, { ChangeEventHandler, useRef, useState } from 'react';
import useUpdate from '@/hooks/useUpdate';
import { scopedClassMaker } from '../helpers/classes';

interface Props {
  item: SourceDataItem;
  level: number;
  treeProps: TreeProps;
}

const scopedClass = scopedClassMaker('ree-tree')
const sc = scopedClass


const TreeItem: React.FC<Props> = (props) => {
  const { item, level, treeProps } = props
  const classes = {
    ['level-' + level]: true,
    'item': true
  }
  const checked = treeProps.multiple ? treeProps.selected.indexOf(item.value) >= 0 : treeProps.selected === item.value
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(treeProps.multiple) {
      if(e.target.checked) {
        treeProps.onChange([...treeProps.selected, item.value])
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== item.value))
      }
    } else {
      if(e.target.checked) {
        treeProps.onChange(item.value)
      } else {
        treeProps.onChange('')
      }
    }
  }
  const expand = () => {
    setExpanded(true)
  }
  const collapse = () => {
    setExpanded(false)
  }
  const [expanded, setExpanded] = useState(true)
  const treeRef = useRef<HTMLDivElement>(null)
  
  useUpdate(expanded, () => {
    const current = treeRef.current;
    if (!current) return;

    let isAnimating = false;
    const handleTransitionEnd = () => {
      current.style.height = '';
      current.classList.toggle('ree-tree-children-present', expanded);
      current.classList.toggle('ree-tree-children-gone', !expanded);
      current.removeEventListener('transitionend', handleTransitionEnd);
      isAnimating = false;
    };

    if (!isAnimating) {
      const { height } = current.getBoundingClientRect();
      current.style.height = expanded ? '0px' : `${height}px`;
      current.getBoundingClientRect(); // Force reflow
      current.style.height = expanded ? `${height}px` : '0px';
      current.addEventListener('transitionend', handleTransitionEnd);
      isAnimating = true;
    }
  });

  return <div key={item.value} className={sc(classes)}>
    <div className={sc('text')}>
      <input 
        type='checkbox' 
        onChange={onChange} 
        checked={checked}
      />
      {item.text}
      {item.children &&
        <span>
          {expanded ? 
            <span onClick={collapse} className={sc('collapse')}>---</span> :
            <span onClick={expand} className={sc('expand')}>+++</span>
          }
        </span>  
      }
    </div>
    <div ref={treeRef} className={sc({children: true, collapsed: !expanded})}>
      {item.children?.map(sub => 
        <TreeItem key={sub.value} treeProps={treeProps} item={sub} level={level + 1} />
      )}
    </div>
  </div>
}

export default TreeItem;