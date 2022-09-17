import { createElement } from '@sppk/mini-react';

const VirtualDOM = () => {
  const node = createElement(
    'h1',
    { className: 'a' },
    createElement('span', {}, 'a'),
    createElement('span', {}, 'b')
  );
  return (
    <pre>
      <code>
        {JSON.stringify(node, null, 2)}
      </code>
    </pre>
  );
};

export default VirtualDOM;
