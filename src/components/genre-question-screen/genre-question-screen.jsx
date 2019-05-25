import React from 'react';
import PropTypes from 'prop-types';

import Player from '../player/player.jsx';
import withAudio from '../../hocs/with-audio/with-audio';
const PlayerWithAudio = withAudio(Player);

const GenreQuestionScreen = ({
  question,
  activePlayer,
  children,
  playButtonHandler,
  handleInputChange,
  answerHandler,
}) => {
  const {
    answers,
    genre,
    type,
  } = question;
  return (
    <section className={`game game--${type}`}>
      {children}
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          answerHandler();
        }}>
          {answers.map((it, i) => <div className="game__track" key={`answer-${i}`}>
            <PlayerWithAudio
              src={it.src}
              isPlaying={i === activePlayer}
              playButtonClickHandler={() => playButtonHandler(i)}
            />
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                onChange={(evt) => handleInputChange(evt, i)}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>
            Отметить
              </label>
            </div>
          </div>)}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

export default GenreQuestionScreen;

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
    type: PropTypes.oneOf([`genre`]).isRequired,
  }).isRequired,

  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),

  activePlayer: PropTypes.number.isRequired,
  playButtonHandler: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  answerHandler: PropTypes.func.isRequired,
};

