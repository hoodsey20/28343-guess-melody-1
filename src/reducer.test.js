import {reducer} from './reducer';
import {reduxActionTypes} from './consts';

const {
  INCREMENT_QUESTION,
  INCREMENT_MISTAKES,
  RESET,
} = reduxActionTypes;

const mockState = {
  question: -1,
  mistakes: 0,
};

it(`Reducer without suitable action type returns initial state`, () => {
  expect(reducer(mockState, {type: `NOT_EXIST`})).toEqual(mockState);
});

it(`Reducer should increment current question number according to passing number`, () => {
  expect(
      reducer(mockState, {type: INCREMENT_QUESTION, payload: 1})
  ).toEqual({
    question: 0,
    mistakes: 0,
  });
  expect(
      reducer(mockState, {type: INCREMENT_QUESTION, payload: 3})
  ).toEqual({
    question: 2,
    mistakes: 0,
  });
});

it(`Reducer should increment current mistakes number according to passing number`, () => {
  expect(
      reducer(mockState, {type: INCREMENT_MISTAKES, payload: 1})
  ).toEqual({
    question: -1,
    mistakes: 1,
  });
  expect(
      reducer(mockState, {type: INCREMENT_MISTAKES, payload: 3})
  ).toEqual({
    question: -1,
    mistakes: 3,
  });
});

it(`Reducer shout correctly resets`, () => {
  expect(
      reducer({
        question: 7,
        mistakes: 2,
      }, {type: RESET})
  ).toEqual({
    question: -1,
    mistakes: 0,
  });
});
