import {reduxActionTypes} from './consts';

const {
  INCREMENT_QUESTION,
  INCREMENT_MISTAKES,
  RESET,
} = reduxActionTypes;

const initialState = {
  question: -1,
  mistakes: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_QUESTION:
      return Object.assign({}, state, {
        question: state.question + action.payload,
      });

    case INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case RESET:
      return Object.assign({}, initialState);
  }

  return state;
};
