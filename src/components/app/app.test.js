import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const mock = {
  gameTime: 5,
  lives: 10,
  question: -1,
  mistakes: 0,
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
  const {gameTime, lives, questions, question, mistakes} = mock;
  const tree = renderer.create(<App
    gameTime={gameTime}
    lives={lives}
    questions={questions}
    question={question}
    mistakes={mistakes}
    handleWelcomeScreen={jest.fn()}
    handleUserAnswer={jest.fn()}
    handleReset={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
