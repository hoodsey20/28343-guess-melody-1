import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

function init() {
  ReactDOM.render(
      <App />,
      document.querySelector(`.main`));
}
init();
