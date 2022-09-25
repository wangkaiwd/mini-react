export type BuiltInTag = keyof HTMLElementTagNameMap;

export type VNodeType = BuiltInTag | ((props: Record<any, any>) => any)

export interface VNode {
  $$typeof: symbol;
  type: VNodeType;
  ref?: any;
  key?: string | number;
  props: Record<any, any>;
}
