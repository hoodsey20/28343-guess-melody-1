import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './player.jsx';

it(`AudioPlayer is rendered correctly`, () => {
  const playButtonClickHandler = jest.fn();

  const mockAudio = `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`;

  function createNodeMock() {
    return {};
  }

  const tree = renderer.create(<AudioPlayer
    isPlaying={false}
    isLoading={true}
    src={mockAudio}
    playButtonClickHandler={playButtonClickHandler}
    renderAudio={() => <div/>}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});


