import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const mock = {
  gameTime: 5,
  lives: 10,
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `rock`,
        },
      ],
    }, {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `John Snow`,
        },
      ],
    },
  ]
};

it(`App is rendered correctly`, () => {
  const {gameTime, lives, questions} = mock;
  const tree = renderer.create(<App
    gameTime={gameTime}
    lives={lives}
    questions={questions}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
