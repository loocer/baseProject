import React from 'react';

export default function Icon({
  type, className = '', size = 'md', ...otherProps
}) {
  return (<svg
    className={`am-icon am-icon-${type.id} am-icon-${size} ${className}`}
    {...otherProps}
  >
    <use xlinkHref={`#${type.id}`} />
  </svg>);
}
