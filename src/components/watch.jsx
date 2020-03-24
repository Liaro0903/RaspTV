import React from 'react';
import Youtube from 'react-youtube';

const Watch = (props) => (
  <div>
    <Youtube
      videoId={props.videoId}
      opts={{
        height: '1080',
        width: '1920',
        playerVars: {
          autoplay: 1,
        }
      }}
    />
  </div>
);

export default Watch;