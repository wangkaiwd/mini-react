import { REACT_CONTEXT, REACT_PROVIDER } from './constants';

export const createContext = (defaultValue?: any) => {
  const context: any = {
    $$typeof: REACT_CONTEXT,
    _currentValue: defaultValue ?? null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER,
    _context: context
  };
  context.Consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context
  };
  return context;
};
