import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';

const mock = {
  gameTime: 5,
  lives: 10,
};

it(`WelcomeScreen is rendered correctly`, () => {
  const {gameTime, lives} = mock;
  const tree = renderer.create(<WelcomeScreen
    gameTime={gameTime}
    lives={lives}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
