import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen.jsx';

configure({adapter: new Adapter()});

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

it(`onAnswer handler fired for every selected variant`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const wrapper = mount((
    <ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
    />
  ));

  const answersLength = question.answers.length;

  wrapper.find(`.artist__input`).forEach((node) => {
    node.simulate(`change`);
  });

  expect(onAnswer).toHaveBeenCalledTimes(answersLength);
});
