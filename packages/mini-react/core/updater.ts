import { Component } from '@sppk/mini-react';

const shouldUpdate = (instance: Component) => {
  instance.forceUpdate();
};

class Updater {
  private readonly instance: Component;

  constructor (instance: Component) {
    this.instance = instance;
  }

  updateComponent = () => {
    shouldUpdate(this.instance);
  };
}

export {
  Updater
};
