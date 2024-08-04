
import React from 'react';
import Icon from './icon/icon';
function Button() {
  const fn: React.MouseEventHandler<SVGElement> = (e) => {
    console.log(e.target);
  }
  return (
    <div>
      <Icon name='wechat' />
      <Icon name='apple' />
      <Icon 
        name='apple' 
        className='testClassName' 
        onClick={fn}
        onMouseEnter={() => console.log('enter')}
        onMouseLeave={() => console.log('leave')}
      />
    </div>
  );
}

export default Button;