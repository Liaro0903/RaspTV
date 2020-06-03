import React, { useState, useEffect } from 'react';
import Youtube from 'react-youtube';
import openSocket from 'socket.io-client';
import { Typography } from '@material-ui/core';
import { baseURL } from '../constants';

const socket = openSocket(baseURL);

const Watch = () => {

  const [power, setPower] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    socket.emit('getPower');
    socket.emit('getActive');
  }, []);

  socket.on('power', (power) => setPower(power));
  socket.on('active', (active) => setActive(active));

  return (
    <div>
      {power ?
        <Youtube
          videoId={active}
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