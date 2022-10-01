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
const wrapper = (event: Event, handler: (...args: any[]) => any) => {
  updateQueue.isBatchUpdating = true;
  const result = handler(event);
  updateQueue.batchUpdate();
  return result;
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
    const fn = (e: Event) => wrapper(e, fn.value);
    fn.value = handler;
    store[eventType] = fn;
    document.addEventListener(eventType, fn);
  } else {
    const fn = store[eventType];
    fn.value = handler;
  }
};
