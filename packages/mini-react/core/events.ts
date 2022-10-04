import { Updater } from './updater';

// think:
// batch update: rally all partial state to an array, then merge every part of array with component state after execute event handler

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
// batch update
const handlerWrapper = (event: Event) => {
  updateQueue.isBatchUpdating = true;
  const syntheticEvent: any = createSyntheticEvent(event);
  const { type, target } = syntheticEvent;
  let currentTarget = target as any;
  while (currentTarget) {
    const handler = currentTarget?.listenersStore?.[type].value;
    if (syntheticEvent?.propagationStopped) {
      break;
    }
    if (handler) {
      handler(syntheticEvent);
      break;
    }
    currentTarget = currentTarget.parentNode;
  }

  updateQueue.batchUpdate();
};

type ListenersStore = Record<string, {
  (...args: any[]): any
  value: (...args: any[]) => any
}>;

// todo: proxy event to document ?
export const addEvent = (el: HTMLElement & Record<string, any>, eventType: string, handler: (...args: any[]) => any) => {
  const store: ListenersStore = el.listenersStore = {};
  // todo:
  //  1. avoid continuous bind the same event
  //  2. click document also will trigger event
  if (!store[eventType]) {
    const fn = (e: Event) => handlerWrapper(e);
    fn.value = handler;
    store[eventType] = fn;
    if (!(document as any)[`on${eventType}`]) {}
    (document as any)[`on${eventType}`] = fn;
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



