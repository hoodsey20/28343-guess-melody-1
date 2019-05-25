import React from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = (props) => {
  const {isLoading, isPlaying, playButtonClickHandler, renderAudio} = props;

  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={playButtonClickHandler}
      />
      <div className="track__status">
        {renderAudio()}
      </div>
    </React.Fragment>
  );
};

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playButtonClickHandler: PropTypes.func.isRequired,
  renderAudio: PropTypes.func.isRequired,
};

export default AudioPlayer;
