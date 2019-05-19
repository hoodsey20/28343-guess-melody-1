import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };

    this._handleChangeScreen = this._handleChangeScreen.bind(this);
  }

  _handleChangeScreen() {
    const {questions} = this.props;
    const {question} = this.state;

    this.setState({
      question: question + 1 >= questions.length
        ? -1
        : question + 1,
    });
  }

  _getScreen(question) {
    if (!question) {
      const {
        lives,
        gameTime,
      } = this.props;

      return <WelcomeScreen
        lives={lives}
        gameTime={gameTime}
        onClick={this._handleChangeScreen}
      />;
    }

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        question={question}
        onAnswer={(answer) => {
          /*eslint-disable*/
					console.log(`ответ: `, answer)
          /*eslint-disable*/
          this._handleChangeScreen();
        }}
      />;

      case `artist`: return <ArtistQuestionScreen
        question={question}
        onAnswer={(answer) => {
          /*eslint-disable*/
					console.log(`ответ: `, answer)
          /*eslint-disable*/
          this._handleChangeScreen();
        }}
      />;
    }

    return null;
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return (
      <React.Fragment>
        {this._getScreen(questions[question])}
      </React.Fragment>
    );
  }
}

App.propTypes = {
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
};

export {App};

const mapStateToProps = (state, ownProps) => ({
  question: state.question,
  mistakes: state.mistakes,
});

export default connect(mapStateToProps)(App);
