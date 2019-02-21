import React from 'react';
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react';

require('velocity-animate/velocity.ui');

const DOWN = velocityHelpers.registerEffect({
  // longer due to spring timing
  defaultDuration: 600,
  calls: [
    [{
      transformPerspective: [800, 800],
      transformOriginX: ['50%', '50%'],
      transformOriginY: [0, 0],
      // rotateX: [0, 'spring'], 去掉抖动的效果
      rotateX: [0],
      opacity: 1,
    }, 1, {
      delay: 0,
      easing: 'ease-in',
    }],
  ],
});
// Flips the box up nearly 180°.
const UP = velocityHelpers.registerEffect({
  defaultDuration: 0,
  calls: [
    [{
      transformPerspective: [800, 800],
      transformOriginX: ['50%', '50%'],
      transformOriginY: [0, 0],
      rotateX: 160,
      opacity: 0,
    }],
  ],
});

export default function SlipPage({ children }) {
  return <VelocityTransitionGroup enter={DOWN} leave={UP}>{children}</VelocityTransitionGroup>;
}
