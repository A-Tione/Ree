import * as React from 'react';
import { HTMLAttributes, useEffect, useRef, useState} from 'react'
import { TouchEventHandler } from 'react';
import './scroll.scss'
import cachedScrollbarWidth from './scrollbar-width'
import {scopedClassMaker} from '../helpers/classes'

interface Props extends HTMLAttributes<HTMLElement> {
  onPull?: () => void
}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, onPull, ...rest} = props;
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const [barVisible, setBarVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerIdRef = useRef<number | null>(null)
  const sc = scopedClassMaker('ree-scroll')
  const onScroll = (e: React.UIEvent) => {
    const {current} = scrollRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const scrollTop = current!.scrollTop
    setBarTop((scrollTop * viewHeight) / scrollHeight)
    console.log('move');
    setBarVisible(true)
    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current)
    }
    timerIdRef.current = window.setTimeout(() => {
      setBarVisible(false)
    }, 300)
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

  const [translateY, _setTranslateY] = useState(0);
  const touchY = 100;
  const setTranslateY = (y: number) => {
    if (y < 0) {y = 0;} else if (y > touchY) {y = touchY;}
    _setTranslateY(y);
  };
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(false);
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = scrollRef.current!.scrollTop;
    if (scrollTop !== 0) {return;}
    pulling.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCount.current = 0;
  };
  const onTouchMove: TouchEventHandler = (e) => {
    const deltaY = e.touches[0].clientY - lastYRef.current;
    moveCount.current += 1;
    if (moveCount.current === 1 && deltaY < 0) {
      pulling.current = false;
      return;
    }
    if (!pulling.current) {return;}
    setTranslateY(translateY + deltaY);
    console.log(translateY + deltaY);
    lastYRef.current = e.touches[0].clientY;
  };
  const onTouchEnd: TouchEventHandler = () => {
    if (pulling.current) {
      setTranslateY(0);
      if (translateY >= touchY) {
        onPull && onPull();
      }
      pulling.current = false;
    }
  };

  return (
    <div className={sc('')} {...rest}>
      <div className={sc('inner')}
          style={{right: -cachedScrollbarWidth(), transform: `translateY(${translateY}px)`}}
          ref={scrollRef}
          onScroll={onScroll}
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
      <div className={sc('track', {extra: barVisible? 'show' : ''})} onMouseDown={onMouseDownTrack}>
        <div className={sc('bar')}
            style={{height: barHeight, transform: `translateY(${barTop}px)`}}
            onMouseDown={onMouseDown}
        />
      </div>
      <div className="fui-scroll-pulling" style={{height: translateY}}>
        {translateY === touchY ?
          <span className="fui-scroll-pulling-text">释放手指即可更新</span> :
          <span className="fui-scroll-pulling-icon">↓</span>}
      </div>
    </div>
  )
}

export default Scroll;