import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selectedAnswers: [],
      };

      this._handleInputChange = this._handleInputChange.bind(this);
      this._answerHandler = this._answerHandler.bind(this);
    }

    _handleInputChange(evt, selectedId) {
      console.log('evt.target.value', evt.target.value);
      console.log('evt.target.checked', evt.target.checked);
      const {selectedAnswers} = this.state;

      if (evt.target.checked) {
        selectedAnswers.push(selectedId);
      } else {
        const index = selectedAnswers.indexOf(selectedId);
        selectedAnswers.splice(index, index + 1);
      }

      this.setState({selectedAnswers});
    }

    render() {
      return <Component
        {...this.props}
        handleInputChange={this._handleInputChange}
        answerHandler={this._answerHandler}
      />;
    }

    _answerHandler() {
      const {selectedAnswers} = this.state;
      const {question, answerHandler} = this.props;

      const results = selectedAnswers.map((item) => question.answers[item]);
      answerHandler(results);
    }
  }

  WithUserAnswer.propTypes = {
    answerHandler: PropTypes.func.isRequired,
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
      })).isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `pop`]).isRequired,
      type: PropTypes.oneOf([`genre`]).isRequired,
    }).isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
