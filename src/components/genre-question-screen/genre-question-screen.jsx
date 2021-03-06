import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';
export default class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswers: [],
      activePlayer: -1,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._getAnswers = this._getAnswers.bind(this);
  }

  _handleInputChange(evt) {
    const {selectedAnswers} = this.state;

    function getSelectedId() {
      return evt.target.id.split(`answer-`)[1];
    }

    if (evt.target.checked) {
      selectedAnswers.push(getSelectedId());
    } else {
      const index = selectedAnswers.indexOf(getSelectedId());
      selectedAnswers.splice(index, index + 1);
    }

    this.setState({selectedAnswers});
  }

  _getAnswers() {
    const {selectedAnswers} = this.state;
    const {question} = this.props;

    const results = selectedAnswers.map((item) => question.answers[item]);
    return results;
  }

  render() {
    const {activePlayer} = this.state;
    const {question, onAnswer, children} = this.props;
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
            onAnswer(
                this._getAnswers()
            );
          }}>
            {answers.map((it, i) => <div className="game__track" key={`answer-${i}`}>
              <AudioPlayer
                src={it.src}
                isPlaying={i === activePlayer}
                playButtonClickHandler={() => this.setState({
                  activePlayer: activePlayer === i ? -1 : i
                })}
              />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={this._handleInputChange}
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
  }
}


GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
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
  ])
};
