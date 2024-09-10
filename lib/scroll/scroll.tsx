import * as React from 'react';
import { HTMLAttributes, useEffect, useRef, useState} from 'react'
import './scroll.scss'
import cachedScrollbarWidth from './scrollbar-width'

interface Props extends HTMLAttributes<HTMLElement> {
}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onScroll = (e: React.UIEvent) => {
    const {current} = scrollRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const scrollTop = current!.scrollTop
    setBarTop((scrollTop * viewHeight) / scrollHeight)
  }
  const draggingRef = useRef(false)
  const firstYRef = useRef(0)
  const firstBarTopRef = useRef(0)
  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY
    firstBarTopRef.current = barTop
  }
  
  const onMouseMove = (e: MouseEvent) => {
    if(draggingRef.current) {
      const currentY = e.clientY - firstYRef.current
      const newBarTop = firstBarTopRef.current + currentY
      setBarTopHandle(newBarTop)
      setScrollTop(newBarTop)
    } 
  }
  const onMouseUp = () => {
    draggingRef.current = false
  }
  const onselectstart = (e: Event) => {
    if(draggingRef.current) {
      e.preventDefault()
    }
  }
  const onMouseDownTrack = (e: React.MouseEvent) => {
    const newBarTop = e.clientY - (e.currentTarget.getBoundingClientRect().top + barHeight / 2)
    setBarTopHandle(newBarTop)
    setScrollTop(newBarTop)
  }
  const setBarTopHandle = (newBarTop: number) => {
    if(newBarTop < 0) {return}
    if(newBarTop + barHeight > scrollRef.current!.getBoundingClientRect().height) {return}
    setBarTop(newBarTop)
  }
  const setScrollTop = (newBarTop: number) => {
    const scrollHeight = scrollRef.current!.scrollHeight
    const viewHeight = scrollRef.current!.getBoundingClientRect().height
    scrollRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight
  }

  
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('selectstart', onselectstart)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('selectstart', onselectstart)
    }
  })

  useEffect(() => {
    const {current} = scrollRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const viewTop = current!.getBoundingClientRect().top

    if(viewTop && viewHeight && scrollHeight) {
      const barHeight = (viewHeight * viewHeight) / scrollHeight
      setBarHeight(barHeight)
    }
  }, [])

  return (
    <div className='ree-scroll' {...rest}>
      <div className='ree-scroll-inner' 
          style={{right: -cachedScrollbarWidth()}}
          onScroll={onScroll}
          ref={scrollRef}
      >
        {children}
      </div>
      <div className='ree-scroll-track' onMouseDown={onMouseDownTrack}>
        <div className='ree-scroll-bar' 
            style={{height: barHeight, transform: `translateY(${barTop}px)`}}
            onMouseDown={onMouseDown}
        />
      </div>
    </div>
  )
}

export default Scroll;