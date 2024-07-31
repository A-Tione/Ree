import React from 'react';
import './importIcons'

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({name}) => {
  return (
    <span>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </span>
  )
}

export default Icon;