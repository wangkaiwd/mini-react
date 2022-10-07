import { BuiltInTag, ClassComponent, ForwardRef, FunctionComponent, ProviderComponent, VNode } from './types';
import { addEvent } from './events';
import { REACT_CONTEXT, REACT_FORWARD_REF, REACT_PROVIDER } from './constants';
import { hookStore } from './hooks';
import { isFalsy } from '../utils/dataType';

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
  if (isFalsy(rawChildren)) {return;}
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
  const { props, ref } = vNode;
  const type = vNode.type as ClassComponent;
  const instance = new type(props);
  if (type.contextType) {
    instance.context = type.contextType._currentValue;
  }
  instance.componentWillMount?.();
  const subTree = instance.render();
  if (ref) {
    ref.current = instance;
  }
  instance.oldVNode = vNode.oldVNode = subTree;
  internalRender(subTree, container);
  instance.componentDidMount?.();
}

function renderForwardComponent (vNode: VNode, container: HTMLElement) {
  const type = vNode.type as ForwardRef;
  const { props, ref } = vNode;
  const subTree = type.render(props, ref);
  vNode.oldVNode = subTree;
  internalRender(subTree, container);
}

function renderProviderComponent (vNode: VNode, container: HTMLElement) {
  const type = vNode.type as ProviderComponent;
  const { props } = vNode;
  type._context._currentValue = props.value;
  // props.children
  internalRender(props.children, container);
}

export const internalRender = (vNode: VNode, container: HTMLElement) => {
  const { type } = vNode;
  if (typeof type === 'string') { // native html tag
    renderElement(vNode, container);
  } else if (typeof type === 'object' && type.$$typeof === REACT_FORWARD_REF) { // forward ref
    renderForwardComponent(vNode, container);
  } else if (typeof type === 'object' && type.$$typeof === REACT_PROVIDER) {
    renderProviderComponent(vNode, container);
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
  hookStore.scheduleUpdate = () => {
    if (!hookStore.scheduleUpdated) {
      hookStore.scheduleUpdated = true;
      queueMicrotask(() => {
        hookStore.hookIndex = 0;
        container.innerHTML = '';
        internalRender(vNode, container);
        hookStore.scheduleUpdated = false;
      });
    }
  };
};
