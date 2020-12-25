import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Container, Fab } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import io from 'socket.io-client';
import { IChannel } from '../types/IChannel';

const socket = io();

const useStyles = makeStyles((theme: Theme) =>
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

const renderMobile = (channel: IChannel, classes: any) => (
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

  const [power, setPower] = useState<boolean>(false);
  const [remote] = useState<boolean>(true);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [activeURL, setActiveURL] = useState<string>('');

  const renderRemote = (channel: IChannel, activeURL: string, classes: any) => (
    <Grid item lg={4} xs={12} key={channel.id}>
      <Button
        size='large'
        fullWidth
        variant='contained'
        onClick={() => socket.emit('setActiveURL', channel.url)}
        color={activeURL === channel.url ? 'primary' : 'default'}
        className={classes.paper}
      >
        <Typography variant='h4'>{channel.name}</Typography>
      </Button>
    </Grid>
  )

  useEffect(() => {
    socket.emit('getPower');
    socket.emit('getChannels');
    socket.emit('getActiveURL');
  }, []);

  socket.on('channels', (db: IChannel[]) => setChannels(db));
  socket.on('activeURL', (activeURL: string) => setActiveURL(activeURL));
  socket.on('power', (power: boolean) => setPower(power));

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
        <Grid container spacing={3} justify='center' style={{ marginTop: 80 }}>
          {remote
            ? power ?
              channels.map(channel => renderRemote(channel, activeURL, classes))
              : <div></div>
            : channels.map(channel => renderMobile(channel, classes))
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