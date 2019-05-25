import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import withActivePlayer from './with-active-player';

configure({adapter: new Adapter()});

const MockComponent = ({playButtonHandler}) =>
  <button className="track__button" onClick={() => playButtonHandler(0)}></button>;

MockComponent.propTypes = {
  playButtonHandler: PropTypes.func.isRequired
};

const MockComponentWithActivePlayer = withActivePlayer(MockComponent);

it(`withActivePlayer: player button correctly switches activePlayer`, () => {

  window.HTMLMediaElement.prototype.pause = () => {};

  const wrapper = mount(<MockComponentWithActivePlayer />);

  const trackButton = wrapper.find(`.track__button`);

  expect(wrapper.state().activePlayer).toBe(-1);
  trackButton.simulate(`click`);
  expect(wrapper.state().activePlayer).toBe(0);
  trackButton.simulate(`click`);
  expect(wrapper.state().activePlayer).toBe(-1);
});
