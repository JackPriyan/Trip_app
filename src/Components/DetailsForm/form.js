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

    constructor(){
        super();
    }

    render(){
        const classes = this.props;
        const theme = this.props;

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
                            <TextField id="outlined-basic" 
                                        className={classes.formStyle}  
                                        placeholder="Category" 
                                        variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                        <FormLabel >Start Date</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" 
                                        className={classes.formStyle}  
                                        placeholder="Start Date" 
                                        variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >End Date</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" 
                                        className={classes.formStyle}  
                                        placeholder="End Date" 
                                        variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Task</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}>
                                    Add ToDo Item
                                </Button>
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
                                color="secondary"
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
