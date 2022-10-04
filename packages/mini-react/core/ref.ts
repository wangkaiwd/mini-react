export const createRef = (initialValue?: any) => {
  return { current: initialValue ?? null };
};
