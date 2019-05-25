import React from 'react';
import PropTypes from 'prop-types';

import Player from '../player/player.jsx';
import withAudio from '../../hocs/with-audio/with-audio';
const PlayerWithAudio = withAudio(Player);

export default class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswers: [],
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
    const {question, onAnswer, activePlayer, children, playButtonHandler} = this.props;
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
  ]),
  activePlayer: PropTypes.number.isRequired,
  playButtonHandler: PropTypes.func.isRequired,
};

