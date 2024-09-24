import { useEffect, useRef } from 'react';

const useUpdate = (dep: boolean, fn: ()=> void) => {
  const isFirst = useRef(true)

  useEffect(() => {
    if(!isFirst.current) {
      fn()
    }
    isFirst.current = false
  }, [dep])
}


export default useUpdate;