import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const App = ({questions, renderScreen, question}) => {
  return (
    <React.Fragment>
      {renderScreen(questions, question)}
    </React.Fragment>
  );
};

App.propTypes = {
  // store state
  question: PropTypes.number.isRequired,

  renderScreen: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps)(App);
