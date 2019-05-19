import {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect
} from './actions';


it(`Artist question answers are checked correctly`, () => {
  const artistQuestion = {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: ``,
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
  };

  expect(isArtistAnswerCorrect(
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      }, artistQuestion)).toEqual(false);
  expect(isArtistAnswerCorrect(
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      }, artistQuestion)).toEqual(true);
});


it(`Genre question answers are checked correctly`, () => {
  const genreQuestion = {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: ``,
        genre: `rock`,
      },
      {
        src: ``,
        genre: `pop`,
      },
      {
        src: ``,
        genre: `jazz`,
      },
      {
        src: ``,
        genre: `rock`,
      },
    ],
  };

  const notFullAnswer = [
    {
      src: ``,
      genre: `rock`,
    }
  ];

  const wrongAnswer1 = [];
  const wrongAnswer2 = genreQuestion.answers;
  const wrongAnswer3 = [{
    src: ``,
    genre: `rock`,
  },
  {
    src: ``,
    genre: `pop`,
  }];

  const correctAnswer = [
    {
      src: ``,
      genre: `rock`,
    },
    {
      src: ``,
      genre: `rock`,
    }
  ];

  expect(isGenreAnswerCorrect(notFullAnswer, genreQuestion)).toEqual(false);
  expect(isGenreAnswerCorrect(wrongAnswer1, genreQuestion)).toEqual(false);
  expect(isGenreAnswerCorrect(wrongAnswer2, genreQuestion)).toEqual(false);
  expect(isGenreAnswerCorrect(wrongAnswer3, genreQuestion)).toEqual(false);
  expect(isGenreAnswerCorrect(correctAnswer, genreQuestion)).toEqual(true);
});
