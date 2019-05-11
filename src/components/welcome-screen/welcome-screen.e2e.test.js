import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import WelcomeScreen from './welcome-screen.jsx';

configure({adapter: new Adapter()});

it(`WelcomeScreen once clicked button fired once`, () => {
  const clickHandler = jest.fn();

  const app = shallow(<WelcomeScreen
    gameTime={10}
    lives={5}
    onClick={clickHandler}
  />);

  const startButton = app.find(`.welcome__button`);
  startButton.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});


