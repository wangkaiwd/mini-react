import { VNode } from './types';

export const findDOM = (vNode: VNode): HTMLElement | null => {
  if (!vNode) return null;
  if (vNode.el) {
    return vNode.el;
  } else if (vNode.oldVNode) {
    return findDOM(vNode.oldVNode);
  }
  return null;
};
