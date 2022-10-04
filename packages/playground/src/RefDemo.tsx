import { Component, createElement, createRef } from '@sppk/mini-react';

class TestInput extends Component {
  aRef: { current: any };

  constructor (props: any) {
    super(props);
    this.aRef = createRef();
  }

  getFocus = () => {
    this.aRef.current.focus();
  };

  render () {
    return createElement('input', { ref: this.aRef });
  }
}

class RefDemo extends Component {
  aRef: { current: any };

  constructor (props: any) {
    super(props);
    this.aRef = createRef();
  }

  onClickButton = () => {
    // console.log(this.aRef.current);
    // this.aRef.current.value = 10;
    this.aRef.current.getFocus();
  };

  render () {
    return createElement('div', {}, createElement(TestInput, { ref: this.aRef }), createElement('button', { onClick: this.onClickButton }, 'set'));
  }
}

export default RefDemo;
