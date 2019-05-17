const initialState = {
  question: -1,
  mistakes: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_QUESTION`:
      return Object.assign({}, state, {
        question: state.question + action.payload,
      });

    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });
  }

  return state;
};

export default reducer;
