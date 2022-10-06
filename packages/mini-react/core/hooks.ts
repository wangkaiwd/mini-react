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
  return useReducer(null, initialState);
};

export const useReducer = (reducer: ((state: any, action: any) => any) | null, initialState: any) => {
  const { hookIndex: index, hookStates } = hookStore;
  const state = hookStates[index] ?? initialState;
  hookStore.hookIndex++;
  const dispatch = (actionOrNewState: any) => {
    const newState = reducer ? reducer(state, actionOrNewState) : actionOrNewState;
    if (newState === state) return;
    hookStates[index] = newState;
    // each update from component root? diff whole component tree?
    // yes, React doesn't know where need to update
    hookStore.scheduleUpdate?.();
  };
  return [state, dispatch];
};

function isSameDeps (lastDeps: any, currentDeps: any[]) {
  if (lastDeps.length !== currentDeps.length) {return false;}
  for (let i = 0; i < currentDeps.length; i++) {
    const currentDep = currentDeps[i];
    const lastDep = lastDeps[i];
    if (lastDep !== currentDep) {
      return false;
    }
  }
  return true;
}

export const useMemo = (fn: () => any, deps: any[]) => {
  const { hookStates, hookIndex } = hookStore;
  hookStore.hookIndex++;
  if (hookStates[hookIndex]) {
    const [lastMemo, lastDeps] = hookStates[hookIndex];
    if (isSameDeps(lastDeps, deps)) {
      return lastMemo;
    }
  }
  const memo = fn();
  hookStates[hookIndex] = [memo, deps];
  return memo;
};

export const useCallback = (fn: () => any, deps: any[]) => {
  const { hookStates, hookIndex } = hookStore;
  hookStore.hookIndex++;
  if (hookStates[hookIndex]) {
    const [lastCallback, lastDeps] = hookStates[hookIndex];
    if (isSameDeps(lastDeps, deps)) {
      return lastCallback;
    }
  }
  hookStates[hookIndex] = [fn, deps];
  return fn;
};
