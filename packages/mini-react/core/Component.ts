import { Updater } from './updater';

class Component {
  static isReactClassComponent = true;
  state: Record<any, any> = {};
  props: Record<any, any>;
  oldVNode: Record<any, any> | undefined = undefined;
  private updater: Updater;

  constructor (props: Record<any, any>) {
    this.props = props;
    this.updater = new Updater(this);
    console.log('this.state1', this.state);
  }

  setState = (partialState: Record<any, any>) => {
    this.state = {
      ...this.state,
      ...partialState
    };
    this.updater.updateComponent();
  };

  forceUpdate = () => {
    const { oldVNode } = this;
    console.log('old', oldVNode);
  };

  render () {

  };
}

export {
  Component
};
