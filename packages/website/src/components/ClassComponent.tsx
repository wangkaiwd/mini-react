import { Component, render, createElement } from '@sppk/mini-react';

class Test extends Component {
  constructor (props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  onClick = () => {
    console.log('click');
    this.setState({ number: ++this.state.number });
  };
  render = () => {
    return <span style={{ color: 'red' }} onClick={this.onClick}>{this.state.number}</span>;
  };
}

render(createElement(Test, {}), document.querySelector('body')!);




