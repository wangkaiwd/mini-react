import { createElement, render } from '@sppk/mini-react';

const element = createElement('div', {}, createElement('span', {}, 'a'));
render(element, document.getElementsByTagName('body')[0]);


