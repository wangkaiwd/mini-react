import { REACT_ELEMENT } from './constants';
import { VNode, VNodeType } from './types';

const normalizeChildren = (children: any[]) => {
  if (children.length === 1) {
    return children[0];
  }
  return children;
};
export const createElement = (type: VNodeType, props: Record<any, any>, ...children: (string | VNode)[]): VNode => {
  const { ref, key, ...restProps } = props;
  const normalizedChildren = normalizeChildren(children);
  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props: {
      ...restProps,
      children: normalizedChildren
    },
  };
};
