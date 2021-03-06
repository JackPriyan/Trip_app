import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormPanel from '../DetailsForm/form'
import FilterPanel from '../FilterMenu/filter'
import ListPanel from '../TripList/grid_list'

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
    <div className={classes.root} style={{margin:'20px'}}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
            <FilterPanel/>
        </Grid>
        <Grid item xs={5}>
            <ListPanel></ListPanel>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <FormPanel/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
