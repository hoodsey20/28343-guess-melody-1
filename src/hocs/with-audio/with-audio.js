import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
    }

    _playButtonClickHandler() {
      this.props.playButtonClickHandler();
      this.setState({isPlaying: !this.state.isPlaying});
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      if (audio) {
        audio.src = src;

        audio.oncanplaythrough = () => this.setState({
          isLoading: false,
        });

        audio.onplay = () => {
          this.setState({
            isPlaying: true,
          });
        };

        audio.onpause = () => this.setState({
          isPlaying: false,
        });

        audio.ontimeupdate = () => this.setState({
          progress: Math.ceil(audio.currentTime)
        });
      }
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;
      if (audio) {
        if (this.props.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;
      if (audio) {
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onpause = null;
        audio.ontimeupdate = null;
        audio.src = ``;
      }
    }

    render() {
      const {isLoading, isPlaying} = this.state;
      return (
        <Component
          isLoading={isLoading}
          isPlaying={isPlaying}
          playButtonClickHandler={this._playButtonClickHandler}
          renderAudio={() => <audio ref={this._audioRef} />}
        />
      );
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    playButtonClickHandler: PropTypes.func.isRequired,
  };

  return WithAudio;
};

export default withAudio;
