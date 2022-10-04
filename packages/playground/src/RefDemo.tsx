import { Component, createElement, createRef, forwardRef, ForwardRef } from '@sppk/mini-react';

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

const TestFnInput: ForwardRef['render'] = (props: any, ref) => {
  const sayHi = () => {
    console.log('sayHi');
  };
  ref.current = {
    sayHi
  };
  return createElement('input', {});
};
const FnInput = forwardRef(TestFnInput);

class RefDemo extends Component {
  aRef: { current: any };
  bRef: { current: any };

  constructor (props: any) {
    super(props);
    this.aRef = createRef();
    this.bRef = createRef();
  }

  onClickButton = () => {
    // console.log(this.aRef.current);
    // this.aRef.current.value = 10;
    this.aRef.current.getFocus();
  };
  onClick = () => {
    console.log('bRef', this.bRef.current);
  };

  render () {
    return createElement(
      'div', {},
      createElement(TestInput, { ref: this.aRef }),
      createElement('button', { onClick: this.onClickButton }, 'set'),
      createElement(FnInput, { ref: this.bRef }),
      createElement('button', { onClick: this.onClick }, 'set'),
    );
  }
}

export default RefDemo;
