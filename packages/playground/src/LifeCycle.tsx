import { Component, createElement } from '@sppk/mini-react';

// @ts-ignore
class Child extends Component {
  constructor (props: any) {super(props);}

  componentWillMount () {
    console.log('child componentWillMount');
  }

  componentDidMount () {
    console.log('child componentDidMount');
  }

  componentWillUpdate (nextProps: Record<any, any>, nextState: Record<any, any>) {
    console.log('child componentWillUpdate');
  }

  componentShouldUpdate (nextProps: Record<any, any>, nextState: Record<any, any>): boolean {
    console.log('child componentShouldUpdate');
    return true;
  }

  componentDidUpdate (prevProps: Record<any, any>, prevState: Record<any, any>) {
    console.log('child componentDidUpdate');
  }

  render () {
    console.log('child render');
    return createElement('span', {}, this.props.count);
  }
}

// @ts-ignore
class LifeCycle extends Component {
  constructor (props: any) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentWillMount () {
    console.log('parent componentWillMount');
  }

  componentDidMount () {
    console.log('parent componentDidMount');
  }

  componentWillUpdate (nextProps: Record<any, any>, nextState: Record<any, any>) {
    console.log('parent componentWillUpdate');
  }

  componentShouldUpdate (nextProps: Record<any, any>, nextState: Record<any, any>): boolean {
    console.log('parent componentShouldUpdate');
    return true;
  }

  componentDidUpdate (prevProps: Record<any, any>, prevState: Record<any, any>) {
    console.log('parent componentDidUpdate');
  }

  onClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render () {
    console.log('parent render');
    return createElement(
      'div', {},
      createElement(Child, { count: this.state.count }),
      createElement('button', { onClick: this.onClick }, '+')
    );
  }
}

export default LifeCycle;
