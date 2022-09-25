import { createElement, render } from '@sppk/mini-react';

const RenderElement = () => {
  return createElement('div', {}, createElement('span', {}, 'a'));
};

render(createElement(RenderElement, {}), document.getElementsByTagName('body')[0]);


