class Component {
  static isReactClassComponent = true;
  state = {};
  props: Record<any, any>;

  constructor (props: Record<any, any>) {
    this.props = props;
  }

  setState = (patch: Record<any, any>) => {
    this.state = {
      ...this.state,
      ...patch
    };
  };
  render = () => {

  };
}

export {
  Component
};
