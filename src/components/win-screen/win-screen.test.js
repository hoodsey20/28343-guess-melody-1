import React from 'react';
import renderer from 'react-test-renderer';

import WinScreen from './win-screen.jsx';

it(`WinScreen is rendered correctly`, () => {
  const tree = renderer.create(<WinScreen
    handleRestart={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
