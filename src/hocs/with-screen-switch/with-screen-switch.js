import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "recompose";

import {ActionCreator} from '../../actions';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import GameHeader from '../../components/game-header/game-header.jsx';
import WinScreen from "../../components/win-screen/win-screen.jsx";

import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';

const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(GenreQuestionScreen)
);

const ArtistQuestionScreenWithActivePlayer = withActivePlayer(
    ArtistQuestionScreen
);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
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
        return <WinScreen handleRestart={handleReset} />;
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
          <GenreQuestionScreenWrapped
            question={currentQuestion}
            answerHandler={this._handleUserAnswer}
          >
            <GameHeader mistakes={mistakes} />
          </GenreQuestionScreenWrapped>
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
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }
  }

  WithScreenSwitch.propTypes = {
    gameTime: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
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

    // store state
    question: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,

    // store methods
    handleWelcomeScreen: PropTypes.func.isRequired,
    handleUserAnswer: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
  };

  return WithScreenSwitch;
};


export {withScreenSwitch};

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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
