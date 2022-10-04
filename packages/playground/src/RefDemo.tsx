import { Component, createElement, createRef } from '@sppk/mini-react';

class RefDemo extends Component {
  aRef: { current: any };

  constructor (props: any) {
    super(props);
    this.aRef = createRef();
  }

  onClickButton = () => {
    console.log(this.aRef.current);
    this.aRef.current.value = 10;
  };

  render () {
    return createElement('div', {}, createElement('input', { ref: this.aRef }), createElement('button', { onClick: this.onClickButton }, 'set'));
  }
}

export default RefDemo;
