import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';

import App from './components/app/app.jsx';
import {reducer} from './reducer';
import {questions, gameSettings} from './mocks/questions';

const middlewares = [logger];

function init() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

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
