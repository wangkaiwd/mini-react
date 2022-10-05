import { Updater } from './updater';
import { VNode } from './types';
import { internalRender } from './react-dom';

abstract class Component {
  static isReactClassComponent = true;
  state: Record<any, any> = {};
  props: Record<any, any>;
  oldVNode: Record<any, any> | undefined = undefined;
  private updater: Updater;

  abstract render (): VNode

  abstract componentWillMount? (): void;

  abstract componentDidMount? (): void;

  abstract componentShouldUpdate? (nextProps: Record<any, any>, nextState: Record<any, any>): boolean;

  abstract componentWillUpdate? (nextProps: Record<any, any>, nextState: Record<any, any>): void;

  abstract componentDidUpdate? (prevProps: Record<any, any>, prevState: Record<any, any>): void;

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
