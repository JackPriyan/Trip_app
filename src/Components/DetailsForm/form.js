import React, {Component} from 'react';
import { createMuiTheme, withStyles, ThemeProvider  } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, purple } from '@material-ui/core/colors';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const styles = theme => ({
    palette: {
        primary: green,
      },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },

    formControl: {
        display: 'inline-block'
    },
    formStyle: {
        marginTop : '1 rem'
    },
    button: {
        margin: theme.spacing(1),
      },
  });



class form extends Component {

    constructor(props){
        super();
        this.state = {};
        const date = new Date();
        const todayDate = moment(date).format("yyyy-MM-DD");
        const startDate = moment(date).format("yyyy-MM-DD");   
        this.state = {todayDate : todayDate, startDate: startDate};

    }
    componentDidMount() {
        console.log('I was triggered during componentDidMount',this.state);
    }

    render(){
        const classes = this.props;
        const theme = this.props;

        const handleChange = (name, event) => {
            const target = event.target; // Do we need this?(unused in the function scope)!
            console.log("New Date => ", event.target.value)
              // Prints the new value.
            
            };

        return(
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl className={classes.formControl} style={{display: 'inline-block'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Title</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField  id="outlined-basic" 
                                        className={classes.formStyle} 
                                        placeholder="Title" 
                                        variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Destination</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" 
                                        className={classes.formStyle}  
                                        placeholder="Destination" 
                                        variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Category</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                        <FormControl variant="outlined" style={{width: '100%', alignItems:'left', alignContent:'left'}}>
                            <Select
                                    id="demo-simple-select-outlined"
                                    value={0}
                                    placeholder="Age">
                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Business</MenuItem>
                            <MenuItem value={20}>Vacation</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                        <FormLabel >Start Date</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField  style={{width: '100%'}}
                                        id="outlined-basic" 
                                        className={classes.formStyle}  
                                        variant="outlined" 
                                        type="date"
                                        defaultValue={this.state.todayDate}
                                        InputProps={{inputProps: { min: this.state.todayDate} }}
                                        onChange={(event) => handleChange("plannedDep", event)}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >End Date</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" 
                                        style={{width: '100%'}}
                                        className={classes.formStyle}  
                                        placeholder="End Date" 
                                        variant="outlined" 
                                        type="date"
                                        defaultValue={this.state.startDate}
                                        InputProps={{inputProps: { min: this.state.startDate} }}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >ToDo</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                        <TextField id="outlined-basic" 
                                        className={classes.formStyle}  
                                        placeholder="ToDo Item" 
                                        variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <Button style={{height: '100%'}}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}>
                                    Add 
                                </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                               
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<AddAlertIcon />}>
                                Set Reminder
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                              
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Divider style={{margin : '20px'}} variant="middle" />

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CancelIcon />}>
                                Cancel
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                    </FormControl>
                </form>
            </div>
        );
    }
}

form.propTypes = {
    classes: PropTypes.object.isRequired,
    theme:PropTypes.object.isRequired,
};

export default withStyles(styles)(form);
