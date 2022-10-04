import { Component, createElement } from '@sppk/mini-react';

class SyntheticEvent extends Component {
  constructor (props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  onClick = (e: any) => {
    e.stopPropagation();
    console.log('button');
  };

  onClickOuter = () => {
    console.log('outer');
  };

  render () {
    return createElement('div', { onClick: this.onClickOuter }, createElement('button', {
      onClick: this.onClick,
      style: { color: 'red' }
    }, this.state.number));
  }
}

export default SyntheticEvent;
