import { createElement, useCallback, useMemo, useState } from '@sppk/mini-react';

const Hooks = () => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);
  const onClickCount = () => {
    console.log('click');
    setCount(count + 1);
  };
  const double = useMemo(() => {
    console.log('double');
    return count * 2;
  }, [count]);

  const onClickAge = useCallback(() => {
    setAge(age + 1);
  }, []);

  return createElement(
    'div', {},
    createElement('div', { onClick: onClickCount }, `${count}:${double}`),
    createElement('div', { onClick: onClickAge }, age)
  );
};

export default Hooks;
