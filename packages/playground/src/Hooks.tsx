import { createElement, useState } from '@sppk/mini-react';

const Hooks = () => {
  const [count, setCount] = useState(0);
  const onClick = () => {
    console.log('click');
    setCount(count + 1);
  };
  return createElement('div', { onClick }, count);
};

export default Hooks;
