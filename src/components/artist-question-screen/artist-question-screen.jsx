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
    const {question, onAnswer, children} = this.props;
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
