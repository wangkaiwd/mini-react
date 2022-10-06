import { Updater } from './updater';
import { VNode } from './types';
import { internalRender } from './react-dom';

abstract class Component {
  static isReactClassComponent = true;
  static contextType?: any;
  state: Record<any, any> = {};
  props: Record<any, any>;
  context?: any;
  oldVNode: Record<any, any> | undefined = undefined;
  private updater: Updater;

  abstract render (): VNode

  componentWillMount? (): void;

  componentDidMount? (): void;

  componentShouldUpdate? (nextProps: Record<any, any>, nextState: Record<any, any>): boolean;

  componentWillUpdate? (nextProps: Record<any, any>, nextState: Record<any, any>): void;

  componentDidUpdate? (prevProps: Record<any, any>, prevState: Record<any, any>): void;

  protected constructor (props: Record<any, any>) {
    this.props = props;
    this.updater = new Updater(this);
  }

  setState = (partialState: Record<any, any>) => {
    this.updater.addState(partialState);
  };

  forceUpdate = () => {
    const { oldVNode } = this;
    if (!oldVNode) {return;}
    this.componentWillUpdate?.(this.props, this.state);
    const newVNode = this.render();
    internalRender(newVNode, oldVNode.el.parentNode);
    oldVNode.el.remove();
    this.oldVNode = newVNode;
    this.componentDidUpdate?.(this.props, this.state);
  };
}

export {
  Component
};
