// createElement('h1',{className: 'a'}, [createElement('span',{},'a'),createElement('span',{},'b')])
export const createElement = (type: any, props: Record<any, any>, ...children: any[]) => {
  const { ref, key, ...restProps } = props;
  return {
    ref,
    key,
    props: {
      ...restProps,
      children
    },
    type,
  };
};
