import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';

import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

import {reducer} from './reducer';
import {questions, gameSettings} from './mocks/questions';

const AppWithScreenSwitch = withScreenSwitch(App);
const middlewares = [logger];

function init() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  ReactDOM.render(
      <Provider store={store}>
        <AppWithScreenSwitch
          gameTime={gameSettings.TIME}
          lives={gameSettings.LIVES}
          questions={questions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
}

init();
