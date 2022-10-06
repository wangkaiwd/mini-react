interface HookStore {
  scheduleUpdate?: () => void;
  hookIndex: number;
  hookStates: any[];
}

export const hookStore: HookStore = {
  scheduleUpdate: undefined,
  hookIndex: 0,
  hookStates: []
};
export const useState = (initialState?: any) => {
  const { hookIndex: index, hookStates } = hookStore;
  const state = hookStates[index] ?? initialState;
  hookStore.hookIndex++;
  const setState = (newState: any) => {
    if (newState === state) return;
    hookStates[index] = newState;
    // each update from component root? diff whole component tree?
    // yes, React doesn't know where need to update
    hookStore.scheduleUpdate?.();
  };
  return [state, setState];
};

export const useMemo = (fn: () => any, deps: any[]) => {

};

export const useCallback = (fn: () => any, deps: any[]) => {

};
