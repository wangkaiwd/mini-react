import { ForwardRef } from './types';
import { REACT_FORWARD_REF } from './constants';

export const createRef = (initialValue?: any) => {
  return { current: initialValue ?? null };
};

export const forwardRef = (render: ForwardRef['render']) => {
  return {
    $$typeof: REACT_FORWARD_REF,
    render
  };
};

export const useRef = (initialValue: any) => {

};
