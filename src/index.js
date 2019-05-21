import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';

import App from './components/app/app.jsx';
import {reducer} from './reducer';
import {questions, gameSettings} from './mocks/questions';

function init() {
  const store = createStore(
      reducer,
      applyMiddleware(logger)
  );

  ReactDOM.render(
      <Provider store={store}>
        <App
          gameTime={gameSettings.TIME}
          lives={gameSettings.LIVES}
          questions={questions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
}

init();
