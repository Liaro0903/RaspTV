import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Youtube from 'react-youtube';
import io from 'socket.io-client';

const socket = io();

const Watch = () => {
  const [power, setPower] = useState<boolean>(false);
  const [activeURL, setActiveURL] = useState<string>('');

  useEffect(() => {
    socket.emit('getPower');
    socket.emit('getActiveURL');
  }, []);

  socket.on('power', (power: boolean) => setPower(power));
  socket.on('activeURL', (activeURL: string) => setActiveURL(activeURL));

  return (
    <div>
      {power ?
        <Youtube
          videoId={activeURL}
          opts={{
            height: '1080',
            width: '1920',
            playerVars: {
              autoplay: 1,
            }
          }}
        /> :
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 1920,
          height: 1080,
        }}>
          <Typography variant='h1'>觀看新聞請按綠色按鈕開機</Typography>
        </div>
      }
    </div>
  )
};

export default Watch;