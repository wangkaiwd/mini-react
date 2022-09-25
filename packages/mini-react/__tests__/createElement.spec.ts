import { createElement } from '../index';

describe('createElement', () => {
  it('should create virtual node', () => {
    const node = createElement(
      'h1',
      { className: 'a' },
      createElement('span', {}, 'a'),
      createElement('span', {}, 'b')
    );
    const rawNode = {
      type: 'h1',
      props: {
        key: undefined,
        ref: undefined,
        className: 'a',
        children: [
          { type: 'span', props: { key: undefined, ref: undefined, children: 'a' } },
          { type: 'span', props: { key: undefined, ref: undefined, children: 'b' } }
        ]
      }
    };
    const App = (props: any) => {
      return props.children;
    };
    // const nodeComponent = createElement(
    //   App,
    //   { className: 'a' },
    //   createElement('span', {}, 'a'), // props.children
    //   createElement('span', {}, 'b')
    // );
    expect(node).toEqual(rawNode);
  });
});
