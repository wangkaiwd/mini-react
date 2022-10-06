import { Component, createContext, createElement } from '@sppk/mini-react';

const ThemeContext = createContext();

class Child extends Component {
  static contextType = ThemeContext;

  constructor (props: any) {super(props);}

  render () {
    console.log('this.context', this.context);
    return createElement('span', {}, this.context?.color);
  }

}

class ContextDemo extends Component {
  constructor (props: any) {super(props);}

  render () {
    return createElement(
      ThemeContext.Provider, { value: { color: 'red' } },
      createElement(Child, {})
    );
  }

}

export default ContextDemo;
