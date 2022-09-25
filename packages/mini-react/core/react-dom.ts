import { BuiltInTag, ClassComponent, FunctionComponent, VNode } from './types';

const renderTextNode = (text: string, container: HTMLElement) => {
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
};

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

function renderFunctionComponent (vNode: VNode, container: HTMLElement) {
  const { type, props } = vNode;
  const subTree = (type as FunctionComponent)(props);
  internalRender(subTree, container);
}

function renderClassComponent (vNode: VNode, container: HTMLElement) {
  const { props } = vNode;
  const type = vNode.type as ClassComponent;
  const instance = new type(props);
  const subTree = instance.render() as unknown as VNode;
  internalRender(subTree, container);
}

const internalRender = (vNode: VNode, container: HTMLElement) => {
  const { type, props } = vNode;
  if (typeof type === 'string') { // native html tag
    renderElement(vNode, container);
  } else {  // function: custom component
    if ((type as ClassComponent).isReactClassComponent) {
      renderClassComponent(vNode, container);
    } else {
      renderFunctionComponent(vNode, container);
    }
  }
};
export const render = (vNode: VNode, container: HTMLElement) => {
  internalRender(vNode, container);
};
