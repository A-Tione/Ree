
import React from 'react';
import Icon from './icon';
function Button() {
  const fn = () => {
    console.log('fn');
  }
  return (
    <div>
      <Icon name='wechat' />
      <Icon name='apple' />
      <Icon name='apple' onClick={fn} />
    </div>
  );
}

export default Button;