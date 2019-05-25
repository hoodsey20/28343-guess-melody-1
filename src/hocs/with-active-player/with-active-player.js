import React, {PureComponent} from 'react';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this.playButtonHandler = this.playButtonHandler.bind(this);
    }

    playButtonHandler(id) {
      const {activePlayer} = this.state;

      this.setState({
        activePlayer: activePlayer === id ? -1 : id
      });
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        activePlayer={activePlayer}
        playButtonHandler={this.playButtonHandler}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
