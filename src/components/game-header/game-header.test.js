import React from 'react';
import renderer from 'react-test-renderer';

import GameHeader from './game-header';

it(`MistakesBar is rendered correctly`, () => {
  const tree = renderer.create(<GameHeader
    mistakes={3}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
