import { Component } from './Component';

export type BuiltInTag = keyof HTMLElementTagNameMap;

export interface ForwardRef {
  $$typeof: symbol;
  render: (props: Record<any, any>, ref: Ref) => any;
}

export type FunctionComponent = ((props: Record<any, any>) => any)

// todo:auto generate type of abstract class
export interface ClassComponentInstance {
  state: Record<any, any>;
  props: Record<any, any>;
  oldVNode?: Record<any, any>;

  setState (partialState: Record<any, any>): void;

  render (): VNode;

  forceUpdate (): void;

  [k: string]: any;
}

export interface ClassComponent {
  isReactClassComponent: boolean;

  new (props: Record<any, any>): ClassComponentInstance;
}

export type VNodeType = BuiltInTag | FunctionComponent | ClassComponent | ForwardRef

export interface VNode {
  $$typeof: symbol;
  type: VNodeType;
  ref?: any;
  key?: string | number;
  props: Record<any, any>;
  el?: HTMLElement;
  oldVNode?: VNode;
}

export interface Ref {
  current: any;
}
