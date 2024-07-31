import React from 'react';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({name}) => {
  return (
    <span>{name}</span>
  )
}

export default Icon;