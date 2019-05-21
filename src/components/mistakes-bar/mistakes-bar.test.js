import React from 'react';
import renderer from 'react-test-renderer';

import MistakesBar from './mistakes-bar';

it(`MistakesBar is rendered correctly`, () => {
  const tree = renderer.create(<MistakesBar
    mistakes={3}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
