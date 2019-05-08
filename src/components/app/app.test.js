import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const mock = {
  gameTime: 5,
  lives: 10,
};

it(`App is rendered correctly`, () => {
  const {gameTime, lives} = mock;
  const tree = renderer.create(<App
    gameTime={gameTime}
    lives={lives}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
