import { Component, createElement } from '@sppk/mini-react';

// @ts-ignore
class ClassComponent extends Component {
  constructor (props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  onClick = () => {
    this.setState({
      number: this.state.number + 1
    });
    console.log(this.state);
    this.setState({
      number: this.state.number + 1
    });
    console.log(this.state);
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1
      });
      console.log(this.state);
      this.setState({
        number: this.state.number + 1
      });
      console.log(this.state);
    });
  };

  render () {
    return createElement('button', { onClick: this.onClick, style: { color: 'red' } }, this.state.number);
  }
}

export default ClassComponent;
