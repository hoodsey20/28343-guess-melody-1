import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const mock = {
  question: -1,
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

const renderScreenMock = () => <h1>app</h1>;

it(`App is rendered correctly`, () => {
  const {questions, question} = mock;
  const tree = renderer.create(<App
    questions={questions}
    question={question}
    renderScreen={renderScreenMock}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
