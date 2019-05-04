import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const GAME_TIME = 7;
const LIVES = 4;

function init() {
  ReactDOM.render(
      <App gameTime={GAME_TIME} lives={LIVES} />,
      document.querySelector(`.main`));
}
init();
