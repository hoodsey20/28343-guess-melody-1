import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

import {questions, gameSettings} from './mocks/questions';

function init() {
  ReactDOM.render(
      <App
        gameTime={gameSettings.TIME}
        lives={gameSettings.LIVES}
        questions={questions}
      />,
      document.querySelector(`.main`));
}

init();
