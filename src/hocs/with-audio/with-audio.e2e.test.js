import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import withAudio from './with-audio';

configure({adapter: new Adapter()});

const MockComponent = ({playButtonClickHandler}) =>
  <button className="track__button" onClick={playButtonClickHandler}></button>;

MockComponent.propTypes = {
  playButtonClickHandler: PropTypes.func.isRequired
};

const MockComponentWithAudio = withAudio(MockComponent);

it(`WithAudio: player button correctly switches isPlaying status`, () => {
  const playButtonClickHandler = jest.fn();

  const mockAudio = `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`;

  window.HTMLMediaElement.prototype.pause = () => {};

  const wrapper = mount(<MockComponentWithAudio
    isPlaying={false}
    src={mockAudio}
    playButtonClickHandler={playButtonClickHandler}
  />);

  const trackButton = wrapper.find(`.track__button`);
  wrapper.setState({isLoading: false});
  trackButton.simulate(`click`);
  expect(wrapper.state().isPlaying).toBe(true);
  trackButton.simulate(`click`);
  expect(wrapper.state().isPlaying).toBe(false);
});
