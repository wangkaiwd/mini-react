const normalizeChildren = (children: any[]) => {
  if (children.length === 1 && typeof children[0] === 'string') {
    return children[0];
  }
  return children;
};
export const createElement = (type: any, props: Record<any, any>, ...children: any[]) => {
  const { ref, key, ...restProps } = props;
  const normalizedChildren = normalizeChildren(children);
  return {
    ref,
    key,
    props: {
      ...restProps,
      children: normalizedChildren
    },
    type,
  };
};
