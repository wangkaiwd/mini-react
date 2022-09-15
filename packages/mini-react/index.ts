import { createElement } from './core/react';

console.log('element', createElement('h1', { className: 'a' }, createElement('span', {}, 'a'), createElement('span', {}, 'b')));
