import { BuiltInTag, ClassComponent, FunctionComponent, VNode } from './types';
import { addEvent } from './events';

const eventReg = /^on[A-Z].*/;
const renderTextNode = (text: string, container: HTMLElement) => {
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
};

const processStyle = (props: Record<any, any>, el: HTMLElement) => {
  const style = props.style;
  for (const key in style) {
    el.style[key as any] = style[key];
  }
};

const processListener = (key: string, props: Record<any, any>, el: HTMLElement) => {
  const eventName = key.replace('on', '').toLowerCase();
  const handler = props[key];
  addEvent(el, eventName, handler);
};

function updateProps (el: HTMLElement, props: Record<any, any>) {
  for (const key in props) {
    if (key === 'style') {
      processStyle(props, el);
    } else if (eventReg.test(key)) {
      processListener(key, props, el);
    }
  }
}

const renderElement = (vNode: VNode, container: HTMLElement) => {
  const { type, props, ref } = vNode;
  const { children: rawChildren } = props;
  const children = Array.isArray(rawChildren) ? rawChildren : [rawChildren];
  const el = document.createElement(type as BuiltInTag);
  vNode.el = el;
  if (ref) {
    ref.current = el;
  }
  updateProps(el, props);
  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      renderTextNode(String(child), el);
    } else {
      internalRender(child, el);
    }
  });
  container.appendChild(el);
};

function renderFunctionComponent (vNode: VNode, container: HTMLElement) {
  const { type, props } = vNode;
  const subTree = (type as FunctionComponent)(props);
  vNode.oldVNode = subTree;
  internalRender(subTree, container);
}

function renderClassComponent (vNode: VNode, container: HTMLElement) {
  const { props } = vNode;
  const type = vNode.type as ClassComponent;
  const instance = new type(props);
  const subTree = instance.render();
  instance.oldVNode = vNode.oldVNode = subTree;
  internalRender(subTree, container);
}

export const internalRender = (vNode: VNode, container: HTMLElement) => {
  const { type } = vNode;
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
