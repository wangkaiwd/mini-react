import { Component } from '@sppk/mini-react';
import { updateQueue } from './events';

const shouldUpdate = (instance: Component) => {
  const { props, state } = instance;
  if (!instance.componentShouldUpdate || instance.componentShouldUpdate?.(props, state)) {
    instance.forceUpdate();
  }
};

class Updater {
  private readonly instance: Component;
  pendingStates: Record<any, any>[] = [];

  constructor (instance: Component) {
    this.instance = instance;
  }

  addState = (partialState: Record<any, any>) => {
    this.pendingStates.push(partialState);
    this.emitUpdate();
  };
  emitUpdate = () => {
    if (updateQueue.isBatchUpdating) {
      updateQueue.queue.add(this);
    } else {
      // handle sync update
      this.updateComponent();
    }
  };
  updateComponent = () => {
    this.pendingStates.forEach(pendingState => {
      const { state } = this.instance;
      this.instance.state = {
        ...state,
        ...pendingState
      };
    });
    this.pendingStates = [];
    shouldUpdate(this.instance);
  };
}

export {
  Updater
};
