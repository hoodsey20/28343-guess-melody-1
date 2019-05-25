import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import WinScreen from './win-screen.jsx';

configure({adapter: new Adapter()});

it(`WelcomeScreen once clicked button fired once`, () => {
  const clickHandler = jest.fn();

  const app = shallow(<WinScreen
    handleRestart={clickHandler}
  />);

  const restartButton = app.find(`.replay`);
  restartButton.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});


