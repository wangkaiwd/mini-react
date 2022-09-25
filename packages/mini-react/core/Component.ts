import { Updater } from './updater';

class Component {
  static isReactClassComponent = true;
  state: Record<any, any> = {};
  props: Record<any, any>;
  private updater: Updater;

  constructor (props: Record<any, any>) {
    this.props = props;
    this.updater = new Updater(this);
  }

  setState = (partialState: Record<any, any>) => {
    this.state = {
      ...this.state,
      ...partialState
    };
    this.updater.updateComponent();
  };

  forceUpdate = () => {
    console.log('forceUpdate');
    console.log('this.state', this.state);
  };

  render = () => {

  };
}

export {
  Component
};
