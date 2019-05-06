import React from 'react';
import PropTypes from 'prop-types';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

export default class App extends React.Component {
  render() {
    const {gameTime, lives} = this.props;
    return (
      <WelcomeScreen
        gameTime={gameTime}
        lives={lives}
      />
    );
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
};
