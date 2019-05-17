import reducer from './reducer';

const mockState = {
  question: -1,
  mistakes: 0,
};

it(`Reducer without suitable action type returns initial state`, () => {
  expect(reducer(mockState, {type: `NOT_EXIST`})).toEqual(mockState);
});

it(`Reducer should increment current question number according to passing number`, () => {
  expect(
      reducer(mockState, {type: `INCREMENT_QUESTION`, payload: 1})
  ).toEqual({
    question: 0,
    mistakes: 0,
  });
  expect(
      reducer(mockState, {type: `INCREMENT_QUESTION`, payload: 3})
  ).toEqual({
    question: 2,
    mistakes: 0,
  });
});

it(`Reducer should increment current mistakes number according to passing number`, () => {
  expect(
      reducer(mockState, {type: `INCREMENT_MISTAKES`, payload: 1})
  ).toEqual({
    question: -1,
    mistakes: 1,
  });
  expect(
      reducer(mockState, {type: `INCREMENT_MISTAKES`, payload: 3})
  ).toEqual({
    question: -1,
    mistakes: 3,
  });
});
