import { Component, createElement } from '@sppk/mini-react';


class ClassComponent extends Component {
  constructor (props: any) {
    super(props);
  }

  render () {
    return createElement('span', {}, 'a');
  }
}

export default ClassComponent;
