import { BuiltInTag, VNode } from './types';

const renderElement = (vNode: VNode, container: HTMLElement) => {
  const { type, props } = vNode;
  const { children: rawChildren } = props;
  const children = Array.isArray(rawChildren) ? rawChildren : [rawChildren];
  const el = document.createElement(type as BuiltInTag);
  children.forEach(child => {
    if (typeof child === 'string') {
      renderTextNode(child, el);
    } else {
      internalRender(child, el);
    }
  });
  container.appendChild(el);
};

const renderTextNode = (text: string, container: HTMLElement) => {
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
};

const internalRender = (vNode: VNode, container: HTMLElement) => {
  const { type, props } = vNode;
  if (typeof type === 'string') { // native html tag
    renderElement(vNode, container);
  } else {  // function: custom component
    const subTree = type(props);
    internalRender(subTree, container);
  }
};
export const render = (vNode: VNode, container: HTMLElement) => {
  internalRender(vNode, container);
};
