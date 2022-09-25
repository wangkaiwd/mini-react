import { Component } from './Component';

export type BuiltInTag = keyof HTMLElementTagNameMap;

export type FunctionComponent = ((props: Record<any, any>) => any)

export type ClassComponent = typeof Component;

export type VNodeType = BuiltInTag | FunctionComponent | ClassComponent

export interface VNode {
  $$typeof: symbol;
  type: VNodeType;
  ref?: any;
  key?: string | number;
  props: Record<any, any>;
}
