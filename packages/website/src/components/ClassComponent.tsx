import { Component, render, createElement } from '@sppk/mini-react';

class Test extends Component {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render = () => {
    return createElement('span', {}, 'hello');
  };
}

render(createElement(Test, {}), document.querySelector('body')!);




