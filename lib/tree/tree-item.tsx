import React, { ChangeEventHandler, useRef, useState } from 'react';
import useUpdate from '../hooks/useUpdate';
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

  function collectChildrenValues(item: SourceDataItem): string[] {
    return flatten(item.children?.map(i => [i.value, collectChildrenValues(i)]))
  }

  interface deepArray<T> extends Array<T | deepArray<T>> {}

  function flatten(array?: deepArray<string>): string[] {
    if (!array) {
      return []
    }

    return array.reduce<string[]> ((result, current) => 
      result.concat(typeof current === 'string' ? current : flatten(current)), []
    )
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const childrenValues = collectChildrenValues(item)
    console.log(childrenValues, 'childrenvalues');
    
    if(treeProps.multiple) {
      if(e.target.checked) {
        treeProps.onChange([...treeProps.selected, item.value, ...childrenValues])
      } else {
        treeProps.onChange(treeProps.selected.filter(
          value => value !== item.value && childrenValues.indexOf(value) === -1)
        )
      }
    } else {
      if(e.target.checked) {
        treeProps.onChange(item.value)
      } else {
        treeProps.onChange('')
      }
    }
  }
  
  const deleteNode = (item: SourceDataItem) => {
    const findAndDelete = (array: SourceDataItem[], value: string): SourceDataItem[] => {
      return array.filter((item) => {
        if (item.children) {
          item.children = findAndDelete(item.children, value);
        }
        return item.value !== value;
      });
    };
    if (treeProps.onUpdateSourceData) {
      treeProps.onUpdateSourceData(findAndDelete(treeProps.sourceData, item.value));
    }
  };
    
  const expand = () => {
    setExpanded(true)
  }
  const collapse = () => {
    setExpanded(false)
  }
  const [expanded, setExpanded] = useState(true)

  const treeRef = useRef<HTMLDivElement>(null)
  const textClasses = {
    'text': true,
    'item-selected': checked
  }
  
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
    <div className={sc(textClasses)}>
      <div>
        <label>
          <input 
            type='checkbox' 
            onChange={onChange} 
            checked={checked}
            />
          {item.text}
        </label>
        {item.children &&
          <span>
            {expanded ? 
              <span onClick={collapse} className={sc('collapse')}>---</span> :
              <span onClick={expand} className={sc('expand')}>+++</span>
            }
          </span>  
        }
      </div>
      <div>
        <span onClick={() => deleteNode(item)} className={sc('delete')}>Delete</span>
      </div>
    </div>
    <div ref={treeRef} className={sc({children: true, collapsed: !expanded})}>
      {item.children?.map(sub => 
        <TreeItem key={sub.value} treeProps={treeProps} item={sub} level={level + 1} />
      )}
    </div>
  </div>
}

export default TreeItem;