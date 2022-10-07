import { render, createElement } from '@sppk/mini-react';
// import ClassComponent from './ClassComponent';
// import SyntheticEvent from './SyntheticEvent';
// import App from './RefDemo';
// import App from './LifeCycle';
import App from './Hooks';
// import App from './ContextDemo';
// render(createElement(ClassComponent, {}), document.getElementById('root')!);
render(createElement(App, {}), document.getElementById('root')!);
