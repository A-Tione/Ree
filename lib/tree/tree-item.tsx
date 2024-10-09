import React, { ChangeEventHandler, useRef } from 'react';
import useUpdate from '../hooks/useUpdate';
import useTrigger from '@/hooks/useTrigger';
import { scopedClassMaker } from '../helpers/classes';

interface Props {
  item: SourceDataItem;
  level: number;
  treeProps: TreeProps;
  onItemChange: (values: string[]) => void
}
interface deepArray<T> extends Array<T | deepArray<T>> {}

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
    const childrenValues = collectChildrenValues(item)
    
    if(treeProps.multiple) {
      if(e.target.checked) {
        props.onItemChange([...treeProps.selected, item.value, ...childrenValues])
      } else {
        props.onItemChange(treeProps.selected.filter(
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

  const onItemChange = (values: string[]) => {
    const childrenValues = collectChildrenValues(item)
    const common = intersect(values, childrenValues)
    if(common.length) {
      props.onItemChange(Array.from(new Set(values.concat(item.value))))
      inputRef.current!.indeterminate = common.length !== childrenValues.length
    } else {
      props.onItemChange(values.filter(i => i !== item.value))
      inputRef.current!.indeterminate = false
    }
  }

  function intersect<T>(array1: string[],array2: string[]) {
    const result = []
    for (let i = 0; i < array1.length; i++) {
      if(array2.indexOf(array1[i]) >= 0) {
        result.push(array1[i])
      }
    }
    return result;
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

  const treeRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const textClasses = {
    'text': true,
    'item-selected': checked
  }
  const {expanded, expand, collapse} = useTrigger(true)
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
            ref={inputRef}
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
        <TreeItem key={sub.value} onItemChange={onItemChange} treeProps={treeProps} item={sub} level={level + 1} />
      )}
    </div>
  </div>
}

export default TreeItem;

function collectChildrenValues(item: SourceDataItem): string[] {
  return flatten(item.children?.map(i => [i.value, collectChildrenValues(i)]))
}


function flatten(array?: deepArray<string>): string[] {
  if (!array) {
    return []
  }
  return array.reduce<string[]> ((result, current) => 
    result.concat(typeof current === 'string' ? current : flatten(current)), []
  )
}