import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Container } from '@material-ui/core'
import axios from 'axios';
import { baseURL } from '../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
    grid: {
      margin: theme.spacing(4, 0),
    }
  })
);

const renderMobile = (channel, classes) => (
  <Grid item md={4} xs={12} key={channel.id}>
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

  const [remote, setRemote] = useState(true);
  const [channels, setChannels] = useState([]);
  const [active, setActive] = useState('');

  const renderRemote = (channel, active, classes) => (
    <Grid item md={4} xs={12} key={channel.id}>
      <Button
        size='large'
        fullWidth
        variant='contained'
        onClick={() => updateActive(channel.id, channel.url)}
        color={active === channel.id ? 'primary' : 'default'}
        className={classes.paper}
      >
        <Typography variant='h4'>{channel.name}</Typography>
      </Button>
    </Grid>
  )

  const getChannels = async () => {
    try {
      const channels_resp = await axios.get(`${baseURL}channels`);
      setChannels(channels_resp.data);
      const active_resp = await axios.get(`${baseURL}active`);
      setActive(active_resp.data.channelId);
    } catch (err) {
      console.log(err);
    }
  }

  const updateActive = async (id, url) => {
    try {
      const response = await axios.put(`${baseURL}active`, {
        channelId: id,
        url: url
      });
      setActive(response.data.channelId);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div>
      <Container fixed>
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
        <Grid container spacing={3} justify='center'>
          {remote
            ? channels.map(channel => renderRemote(channel, active, classes))
            : channels.map(channel => renderMobile(channel, active, classes))}
        </Grid>
      </Container>
    </div>
  )
}

export default Remote;