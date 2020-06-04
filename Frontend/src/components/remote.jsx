import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Container, Fab } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import { baseURL } from '../constants';
import openSocket from 'socket.io-client';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const socket = openSocket(baseURL);

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
    grid: {
      margin: theme.spacing(4, 0),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  })
);

const renderMobile = (channel, classes) => (
  <Grid item lg={4} xs={12} key={channel.id}>
    <Button
      size='large'
      fullWidth
      variant='contained'
      href={`https://www.youtube.com/watch?v=${channel.url}`}
      className={classes.paper}
    >
      <Typography variant='h4'>{channel.name}</Typography>
    </Button>
  </Grid>
)

const Remote = () => {
  const classes = useStyles();

  const [power, setPower] = useState(false);
  const [remote] = useState(true);
  const [channels, setChannels] = useState([]);
  const [active, setActive] = useState('');

  const renderRemote = (channel, active, classes) => (
    <Grid item lg={4} xs={12} key={channel.id}>
      <Button
        size='large'
        fullWidth
        variant='contained'
        onClick={() => socket.emit('setActive', channel.url)}
        color={active === channel.url ? 'primary' : 'default'}
        className={classes.paper}
      >
        <Typography variant='h4'>{channel.name}</Typography>
      </Button>
    </Grid>
  )

  useEffect(() => {
    socket.emit('getPower');
    socket.emit('getChannels');
    socket.emit('getActive');
  }, []);

  socket.on('channels', (db) => setChannels(db));
  socket.on('active', (active) => setActive(active));
  socket.on('power', (power) => setPower(power));

  return (
    <div>
      <Container fixed>
        {/*
        <Grid container spacing={2} justify='center' className={classes.grid}>
          <Grid item xs={4}>
            <Button
              size='large'
              fullWidth
              variant='contained'
              color={remote ? 'secondary' : 'default'}
              className={classes.paper}
              onClick={() => setRemote(true)}
            >
              <Typography variant='h4'>遙控器</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              size='large'
              fullWidth
              variant='contained'
              color={remote ? 'default' : 'secondary'}
              className={classes.paper}
              onClick={() => setRemote(false)}
            >
              <Typography variant='h4'>手機看</Typography>
            </Button>
          </Grid>
        </Grid>
        */}
        <Grid container spacing={3} justify='center' style={{marginTop: 80}}>
          {
            remote
              ? power ?
                channels.map(channel => renderRemote(channel, active, classes))
                : <div></div>
              : channels.map(channel => renderMobile(channel, active, classes))
          }
        </Grid>
        {remote ?
          <Grid container justify='center'>
            <Typography align='center' style={{ marginTop: 40 }}>
              <Fab
                aria-label='add'
                color='inherit'
                className={classes.fabGreen}
                onClick={() => socket.emit('setPower', !power)}
              >
                <PowerSettingsNewIcon />
              </Fab>
            </Typography>
          </Grid>
          : <div></div>
        }
        {power ?
          <Grid container justify='center'>
            <Typography variant='h6' align='center' style={{ marginTop: 20 }}>
              看完新聞請記得按綠色按鈕關機
            </Typography>
          </Grid> : <div></div>
        }
      </Container>
    </div>
  )
}

export default Remote;