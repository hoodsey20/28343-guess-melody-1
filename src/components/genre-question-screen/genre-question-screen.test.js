import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `test.mp3`,
        genre: `rock`,
      },
      {
        src: `test.mp3`,
        genre: `pop`,
      },
      {
        src: `test.mp3`,
        genre: `jazz`,
      },
      {
        src: `test.mp3`,
        genre: `rock`,
      },
    ],
  },
};

function createNodeMock() {
  return {};
}

it(`GenreQuestionScreen is rendered correctly`, () => {
  const {question} = mock;
  const tree = renderer.create(<GenreQuestionScreen
    question={question}
    activePlayer={-1}
    answerHandler={jest.fn()}
    playButtonHandler={jest.fn()}
    handleInputChange={jest.fn()}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
