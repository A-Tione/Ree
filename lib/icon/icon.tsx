import React from 'react';
import './importIcons'
import './icon.scss';
import classes from '../helpers/classes'; 

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  onClick?: React.MouseEventHandler<SVGElement>
}

const Icon: React.FC<IconProps> = ({className, name, ...restProps}) => {
  return (
      <svg className={classes('ree-icon', className)} {...restProps}>
        <use xlinkHref={`#${name}`} />
      </svg>
  )
}

export default Icon;