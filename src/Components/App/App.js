import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  //localStorage.setItem('myData', "Test Jak Data");

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            Filter Panel
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            List
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            Details
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
