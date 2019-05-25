import React from 'react';
import PropTypes from 'prop-types';

import Player from '../player/player.jsx';
import withAudio from '../../hocs/with-audio/with-audio';
const PlayerWithAudio = withAudio(Player);

const ArtistQuestionScreen = ({
  question,
  onAnswer,
  children,
  activePlayer,
  playButtonHandler}) => {
  const {
    answers,
    type,
    song,
  } = question;

  return (
    <section className={`game game--${type}`}>
      {children}
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <PlayerWithAudio
          src={song.src}
          isPlaying={(activePlayer === 0)}
          playButtonClickHandler={() => playButtonHandler(0)}
        />

        <form className="game__artist">
          {answers.map((it, i) => <div className="artist" key={i}>
            <input
              className="artist__input visually-hidden"
              type="radio" name="answer"
              value={`artist-${i}`}
              id={`artist-${i}`}
              onChange={() => onAnswer(it)}
            />
            <label className="artist__name" htmlFor={`artist-${i}`}>
              <img className="artist__picture" src={it.picture} alt={it.artist} />
              {it.artist}
            </label>
          </div>)}
        </form>
      </section>
    </section>
  );
};


ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([`artist`]).isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  activePlayer: PropTypes.number.isRequired,
  playButtonHandler: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
