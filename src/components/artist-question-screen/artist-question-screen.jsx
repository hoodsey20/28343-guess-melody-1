import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';

export default class ArtistQuestionScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {isPlaying} = this.state;
    const {question, onAnswer} = this.props;
    const {
      answers,
      type,
      song,
    } = question;
    return (
      <section className={`game game--${type}`}>
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{
                filter: `url(#blur)`,
                transform: `rotate(-90deg) scaleY(-1)`,
                transformOrigin: `center`
              }}
            />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"/>
            <div className="wrong"/>
            <div className="wrong"/>
          </div>
        </header>
        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <AudioPlayer
            src={song.src}
            isPlaying={isPlaying}
            playButtonClickHandler={() => this.setState({isPlaying: !this.state.isPlaying})}
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
  }
}

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
};
