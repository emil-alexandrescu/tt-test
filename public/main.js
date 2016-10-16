import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';

ReactDOM.render(<App />, document.getElementById('root'));

// turn on dev tool
if (document.getElementById('dev-tool')) {
  const DevTools = require('mobx-react-devtools').default; // eslint-disable-line
  ReactDOM.render(<DevTools />, document.getElementById('dev-tool'));
}
