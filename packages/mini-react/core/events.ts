import { Updater } from './updater';

// think:
// batch update: rally all partial state to an array, then merge every part of array with component state after execute event handler

// proxy event to document ?
export const updateQueue = {
  isBatchUpdating: false,
  queue: new Set<Updater>(),
  batchUpdate () {
    this.isBatchUpdating = false;
    this.queue.forEach(item => {
      item.updateComponent();
    });
    this.queue.clear();
  }
};
const handlerWrapper = (event: Event, handler: (...args: any[]) => any) => {
  updateQueue.isBatchUpdating = true;
  const { type, target } = event;
  let currentTarget = target;
  // handle stop propagation recursively
  // while (currentTarget) {
  //   if ((currentTarget as any).store[type]) {
  //     handler(createSyntheticEvent(event));
  //   }
  //   currentTarget = (currentTarget as any).parentNode;
  // }
  handler(createSyntheticEvent(event));
  updateQueue.batchUpdate();
};

type ListenersStore = Record<string, {
  (...args: any[]): any
  value: (...args: any[]) => any
}>;
export const addEvent = (el: HTMLElement & Record<string, any>, eventType: string, handler: (...args: any[]) => any) => {
  const store: ListenersStore = el.listenersStore = {};
  // todo:
  //  1. avoid continuous bind the same event
  //  2. click document also will trigger event
  if (!store[eventType]) {
    const fn = (e: Event) => handlerWrapper(e, fn.value);
    fn.value = handler;
    store[eventType] = fn;
    document.addEventListener(eventType, fn);
  } else {
    const fn = store[eventType];
    fn.value = handler;
  }
};

function preventDefault (this: any) {
  this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.returnValue = false;
  }
}

function stopPropagation (this: any) {
  this.propagationStopped = true;
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBuble = true;
  }
}

/**
 * compatible different browser behavior
 * @param naiveEvent
 */
export const createSyntheticEvent = (naiveEvent: Event) => {
  const syntheticEvent: any = {};
  for (const key in naiveEvent) {
    let value = naiveEvent[key as keyof Event];
    if (typeof value === 'function') {
      value = value.bind(naiveEvent);
    }
    syntheticEvent[key] = value;
  }
  syntheticEvent.nativeEvent = naiveEvent;
  syntheticEvent.defaultPrevented = false;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.propagationStopped = false;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent as Event;
};

