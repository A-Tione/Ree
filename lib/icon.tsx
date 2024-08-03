import React from 'react';
import './importIcons'
import './icon.scss';

interface IconProps {
  name: string;
  onClick?: React.MouseEventHandler<SVGElement>
}

const Icon: React.FC<IconProps> = ({name, onClick}) => {
  return (
      <svg className='ree-icon' onClick={onClick}>
        <use xlinkHref={`#${name}`} />
      </svg>
  )
}

export default Icon;