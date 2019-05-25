import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import withUserAnswer from './with-user-answer';

configure({adapter: new Adapter()});

const MockQuestion = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `rock`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `pop`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `jazz`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `rock`,
    },
  ],
};

const MockComponent = ({handleInputChange, answerHandler, question}) => {
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();
      answerHandler();
    }}>
      {question.answers.map((it, i) =>
        <input
          key={i}
          type="checkbox"
          name="answer"
          value={`answer-${i}`}
          id={`answer-${i}`}
          onChange={(evt) => handleInputChange(evt, i)}
        />
      )}
    </form>
  );
};

MockComponent.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
    type: PropTypes.oneOf([`genre`]).isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  answerHandler: PropTypes.func.isRequired,
};

const MockComponentWithActivePlayer = withUserAnswer(MockComponent);

it(`withUserAnswer: component correctly handling answers in state`, () => {

  window.HTMLMediaElement.prototype.pause = () => {};

  const wrapper = mount(
      <MockComponentWithActivePlayer
        question={MockQuestion}
        answerHandler={jest.fn()}
      />
  );

  expect(wrapper.state().selectedAnswers).toStrictEqual([]);

  wrapper.find(`#answer-0`).simulate(`change`, {target: {checked: true}});
  expect(wrapper.state().selectedAnswers).toStrictEqual([0]);
  wrapper.find(`#answer-1`).simulate(`change`, {target: {checked: true}});
  expect(wrapper.state().selectedAnswers).toStrictEqual([0, 1]);
  wrapper.find(`#answer-0`).simulate(`change`, {target: {checked: false}});
  expect(wrapper.state().selectedAnswers).toStrictEqual([1]);
});
