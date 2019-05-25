import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../actions';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameHeader from '../game-header/game-header.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player';

const GenreQuestionScreenWithActivePlayer = withActivePlayer(
    GenreQuestionScreen
);

const ArtistQuestionScreenWithActivePlayer = withActivePlayer(
    ArtistQuestionScreen
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this._handleWelcomeScreen = this._handleWelcomeScreen.bind(this);
    this._handleUserAnswer = this._handleUserAnswer.bind(this);
  }

  _handleWelcomeScreen() {
    this.props.handleWelcomeScreen();
  }

  _handleUserAnswer(answer) {
    const {questions, question, mistakes, lives, handleUserAnswer} = this.props;

    handleUserAnswer(answer, questions[question], mistakes, lives);
  }

  _getScreen(questions, question) {
    const {handleReset, mistakes, lives, gameTime} = this.props;
    const isNoMoreQuestions = questions.length <= question;
    const currentQuestion = questions[question];

    if (isNoMoreQuestions) {
      handleReset();
      return null;
    }

    if (!currentQuestion) {
      return <WelcomeScreen
        lives={lives}
        gameTime={gameTime}
        onClick={this._handleWelcomeScreen}
      />;
    }

    switch (currentQuestion.type) {
      case `genre`: return (
        <GenreQuestionScreenWithActivePlayer
          question={currentQuestion}
          onAnswer={this._handleUserAnswer}
        >
          <GameHeader mistakes={mistakes} />
        </GenreQuestionScreenWithActivePlayer>
      );

      case `artist`: return (<ArtistQuestionScreenWithActivePlayer
        question={currentQuestion}
        onAnswer={this._handleUserAnswer}
      >
        <GameHeader mistakes={mistakes} />
      </ArtistQuestionScreenWithActivePlayer>
      );
    }

    return null;
  }

  render() {
    const {questions, question} = this.props;

    return (
      <React.Fragment>
        {this._getScreen(questions, question)}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  question: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType(
          [
            PropTypes.shape({
              answers: PropTypes.arrayOf(PropTypes.shape({
                artist: PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
              })).isRequired,
              song: PropTypes.shape({
                artist: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
              }).isRequired,
              type: PropTypes.oneOf([`artist`]).isRequired,
            }),
            PropTypes.shape({
              answers: PropTypes.arrayOf(PropTypes.shape({
                src: PropTypes.string.isRequired,
                genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
              })).isRequired,
              genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
              type: PropTypes.oneOf([`genre`]).isRequired,
            })
          ]
      )
  ).isRequired,
  handleWelcomeScreen: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export {App};

const mapStateToProps = (state) => ({
  question: state.question,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  handleWelcomeScreen: () => dispatch(ActionCreator.incrementStep()),

  handleUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    ));
  },

  handleReset: () => dispatch(ActionCreator.reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
