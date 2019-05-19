import {reduxActionTypes} from './consts';

const {
  INCREMENT_QUESTION,
  INCREMENT_MISTAKES,
  RESET,
} = reduxActionTypes;

export const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

export const isGenreAnswerCorrect = (userAnswer, question) => {
  function isCorrectGenre(it) {
    return it.genre === question.genre;
  }

  const correctAnswersLength = question.answers.filter(isCorrectGenre).length;
  const isAllAnswersCorrect = userAnswer.every(isCorrectGenre);
  const isAnswerFull = userAnswer.length === correctAnswersLength;

  return (isAllAnswersCorrect && isAnswerFull);
};

export const ActionCreator = {
  incrementStep: () => ({
    type: INCREMENT_QUESTION,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: RESET,
      };
    }

    return {
      type: INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
};
