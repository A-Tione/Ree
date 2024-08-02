import React from 'react';
import './importIcons'
import './icon.scss';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({name}) => {
  return (
      <svg className='ree-icon'>
        <use xlinkHref={`#${name}`} />
      </svg>
  )
}

export default Icon;