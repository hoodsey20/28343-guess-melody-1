import React from 'react';
import renderer from 'react-test-renderer';

import ArtistQuestionScreen from './artist-question-screen.jsx';

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
    ],
  },
};

function createNodeMock() {
  return {};
}

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const {question} = mock;
  const tree = renderer.create(<ArtistQuestionScreen
    onAnswer={jest.fn()}
    question={question}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
