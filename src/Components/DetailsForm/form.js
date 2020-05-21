import React, {Component, useState} from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'
import {SaveTrip, DeleteTrip,SaveTripCancel} from '../../actions/action'
import AlertDialog from '../../Components/Dialog/dialog'
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
        console.log("form props => ",props);
        const date = new Date();
        const todayDate = moment(date).format("yyyy-MM-DD");
        const todayDateTime = moment().format("YYYY-MM-DD[T]HH:mm");
        const startDate = moment(date).format("yyyy-MM-DD");   
        const endDate = startDate;   
        const item = props.item;
        const initialState = {todayDate : todayDate,
                                todayDateTime: todayDateTime, 
                                startDate: startDate,
                                endDate : endDate,
                                category: 0,
                                todos:[],
                                isEdit : false,
                                isSaveEnabled: false,
                                title: '',
                                destination: '',
                                newTodo: '',
                                isReminderSet:false,
                                reminderTime:'',
                                selectedTripId: null,
                                id:null,
                                isReminderClicked:false};
        this.state = {...initialState, initialState : initialState, item:props.item};
        //window.localStorage.clear();

    }
    componentDidMount() {
        console.log('State after Mount',this.state);
    }

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        console.log("propChanging", nextProps);
        if(nextProps.selectedTripId == null || nextProps.selectedTripId == -1)
        {
            this.setState({
                ...this.state.initialState
            });
        }
        if(nextProps.item){
            const item = nextProps.item;
            this.setState({...this.state, 
                startDate: item.startDate,
                endDate : item.endDate,
                category: item.category,
                todos:item.todos,
                isEdit : true,
                isSaveEnabled: true,
                title: item.title,
                destination: item.destination,
                isReminderSet:item.isReminderSet,
                reminderTime:item.reminderTime,
                id: item.id,
                isReminderClicked: false});
        }
      }
      
    // static getDerivedStateFromProps(props, current_state) {
    //     if (current_state.value !== props.value) {
    //       return {
    //         value: props.value,
    //         computed_prop: heavy_computation(props.value)
    //       }
    //     }
    //     return null
    // }


   

    render(){
        const classes = this.props;
        const theme = this.props;

        const validate = (newState) => {
            if((newState.title && newState.title.trim()) && 
                (newState.destination && newState.destination.trim()) &&
                newState.category !== 0 &&
                newState.startDate && newState.endDate){
                    this.setState({...newState, isSaveEnabled: true});
                    console.log("newState => ", newState);
                }
            else{
                console.log("newState => ", newState);
                this.setState({...newState, isSaveEnabled: false}); 
            }
        }
        

        const handleChange = (name, event, itemIndex = 0) => {
            const value = event ? event.target ? event.target.value : 0: 0 ; 
            var newState;
            switch(name){
                case "setReminder":
                    newState = {
                        ...this.state, isReminderSet : !this.state.isReminderSet};
                    break;
                case "openReminder":
                    newState = {
                        ...this.state, isReminderClicked: !this.state.isReminderClicked, isReminderSet : !this.state.isReminderSet};
                    break;
                case "title":
                    newState = {
                        ...this.state, title: value};
                    break;
                case "destination":
                    newState = {
                        ...this.state, destination: value};
                    break;
                case "startDate":
                    newState = {
                        ...this.state, startDate: value, endDate : value
                    };
                    break;
                case "endDate":
                    newState = {
                        ...this.state, endDate : value
                    };
                    break;
                case "category":
                    newState = {
                        ...this.state, category : value
                    };
                    break;
                case "addTodo":
                    if(this.state.newTodo.trim()){
                        //Sets the todo id by incrementing the id of last todo item if todo is not empty else id = 0
                        newState = {
                            ...this.state, newTodo:'' , todos:[...this.state.todos,{id: this.state.todos.length? this.state.todos[this.state.todos.length-1].id+1: 0,text:this.state.newTodo, isDone: false}]
                        };

                    console.log('State after addTodo change',this.state);
                    }
                    break;
                case "deleteTodo":
                    //Removing the selected todo from todo array by id
                    const newTodo = this.state.todos.filter( (item, index)=>{if(item.id != itemIndex){ console.log("item.id =>",item.id);  return item;} });
                    newState = {
                        ...this.state, todos:newTodo
                    };
                    break;
                case "checkToDo":
                    const checkTodo = this.state.todos.filter( (item, index)=>{if(item.id == itemIndex){ console.log("item.id =>",item.id); item.isDone = !item.isDone; } return item; });
                    newState = {
                        ...this.state, todos:checkTodo
                    };
                    break;
                case "updateToDoText":
                    const updateTodo = this.state.todos.filter( (item, index)=>{if(item.id == itemIndex){ console.log("item.id =>",item.id); item.text = value; } return item; });
                    newState = {
                        ...this.state, todos:updateTodo
                    };
                        break;
                case "newTodo":
                    newState = {
                        ...this.state, newTodo:value
                    };
                    break;
                case "cancel":
                    console.log("cancel", this.state.initialState);
                    this.setState({
                        ...this.state.initialState
                    });
                    this.props.onTripSaveCancel();
                    return;
                case "delete":
                    var itemsDelete = [];
                    console.log("cancel", this.state.initialState);
                    itemsDelete = JSON.parse(window.localStorage.getItem("TripList"));
                    console.log("itemsDelete => ", itemsDelete);
                    const newListDelete = itemsDelete && itemsDelete.length > 0? itemsDelete.filter((item)=>{ if(item.id !== this.state.id) return item }):[];
                    this.props.onTripDelete(this.state.id, newListDelete);

                    this.setState({
                        ...this.state.initialState
                    });
                    console.log("newList => ", newListDelete);
                    window.localStorage.setItem("TripList", JSON.stringify(newListDelete));
                    return;
                 case "save":
                    var items = [];
                    items = JSON.parse(window.localStorage.getItem("TripList"));
                    console.log("items => ", items);
                    const newList = items && items.length > 0? this.state.id >= 0? items.filter((item)=>{ if(item.id !== this.state.id) return item }) : items:[];
                    newList.push({
                        id: this.state.id >= 0 ? this.state.id : newList.length > 0? newList[newList.length-1].id+1 : 0,
                        title : this.state.title,
                        destination: this.state.destination,
                        category: this.state.category,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        todos: this.state.todos,
                        isReminderSet: this.state.isReminderSet,
                        reminderTime: this.state.reminderTime,
                        state: 0,
                        duration: (moment.duration(moment(this.state.endDate, "YYYY-MM-DD").diff(this.state.startDate, "YYYY-MM-DD")).asDays())
                        
                    });
                    console.log("newList => ", newList);
                    window.localStorage.setItem("TripList", JSON.stringify(newList));
                    this.setState({
                        ...this.state.initialState
                    });
                    this.props.onTripSave(newList);
                    return;
                default:
                    return;
            }
            if(newState)
            validate(newState);
        };

        return(
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl className={classes.formControl} style={{display: 'inline-block'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Title</FormLabel>
                        </Grid>
                        {console.log(this.props.item)}
                        {console.log(this.state.item)}

                        <Grid item xs={8}>
                            <TextField  id="title-text" 
                                        className={classes.formStyle} 
                                        placeholder="Title" 
                                        variant="outlined" 
                                        value={this.state.title||''}
                                        onChange={(event) => handleChange("title", event)}
                                        style={{width:'100%'}}
                                        margin="dense"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Destination</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="destination-text" 
                                        className={classes.formStyle}  
                                        placeholder="Destination" 
                                        variant="outlined" 
                                        value={this.state.destination || ''}
                                        onChange={(event) => handleChange("destination", event)}
                                        style={{width:'100%'}}
                                        margin="dense"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >Category</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                        <FormControl variant="outlined" style={{width: '100%', textAlign:'left', alignContent:'left'}}>
                            <Select id="demo-simple-select-outlined"
                                    value={this.state.category}
                                    onChange={(event) => handleChange("category", event)}
                                    margin="dense">
                            <MenuItem value={0}>
                                None
                            </MenuItem>
                            <MenuItem value={1}>Business</MenuItem>
                            <MenuItem value={2}>Vacation</MenuItem>
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
                                        id="startDate-text" 
                                        className={classes.formStyle}  
                                        variant="outlined" 
                                        type="date"
                                        defaultValue={this.state.todayDate}
                                        value={this.state.startDate}
                                        InputProps={{inputProps: { min: this.state.todayDate} }}
                                        onChange={(event) => handleChange("startDate", event)}
                                        margin="dense"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >End Date</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="endDate-text" 
                                        style={{width: '100%'}}
                                        className={classes.formStyle}  
                                        placeholder="End Date" 
                                        variant="outlined" 
                                        type="date"
                                        value={this.state.endDate}
                                        InputProps={{inputProps: { min: this.state.startDate} }}
                                        onChange={(event) => handleChange("endDate", event)}
                                        margin="dense"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormLabel >ToDo</FormLabel>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                    </Grid>
                    {
                        this.state.todos.map((item, index)=>
                        
                    <Grid container spacing={3} 
                          key={index}>
                        <Grid item xs={1}>
                            <Checkbox name={"Check"+index} color="primary"
                                        checked={item.isDone}
                                        onChange={(event) => handleChange("checkToDo", event, item.id)}/>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField id={"todoItem-text"+index} 
                                        className={classes.formStyle}  
                                        placeholder="ToDo Item" 
                                        variant="outlined" 
                                        value={item.text || ''}
                                        margin="dense"
                                        onChange={(event) => handleChange("updateToDoText", event, item.id)}/>
                        </Grid>
                        <Grid item xs={4}>
                        <div style={{ paddingTop:'8px'}}>
                            <Button id={item.id}
                                    style={{width: '100%'}}
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={(event) => handleChange("deleteTodo", event, item.id)}>
                                    Delete 
                                </Button>
                            </div>
                        </Grid>
                          
                    </Grid>)
                    }
                    <Grid container spacing={3}>
                        <Grid item xs={1} style={{width:'2rem'}}>
                            
                        </Grid>
                        <Grid item xs={7}  style={{width:'100%'}}>
                        <TextField id="toDoNew-text" 
                                        className={classes.formStyle}  
                                        placeholder="ToDo Item" 
                                        variant="outlined" 
                                        margin="dense"
                                    onChange={(event) => handleChange("newTodo", event)}
                                    value={this.state.newTodo || ''}/>
                        </Grid>
                        <Grid item xs={4} style={{width:'100%'}}>
                            <div style={{ paddingTop:'8px'}}>
                            <Button style={{ width: '100%'}}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                    onClick={(event) => handleChange("addTodo", event)}
                                    margin="dense">
                                    Add 
                                </Button>
                                </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                        <AlertDialog isOpen={this.state.isReminderClicked} 
                                        onClose={(event) => handleChange("setReminder", event)}
                                        minDate={this.state.todayDateTime}/>
                        <Checkbox   name={"Check"}
                                    onChange={(event) => handleChange("setReminder", event)}></Checkbox>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<AddAlertIcon />}
                                onClick={(event) => handleChange("openReminder", event)}>
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
                                startIcon={<SaveIcon />}
                                onClick={(event) => handleChange("save", event)}
                                disabled={!this.state.isSaveEnabled}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                onClick={(event) => handleChange("cancel", event)}>
                                Cancel
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={(event) => handleChange("delete", event)}
                                disabled={!this.state.isEdit}>
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
    classes: PropTypes.object.isRequired
};

const getItemDetails = (items,id) => {
    if(id>=0){
        return items.find(item => item.id == id);
    }
    console.log("getItemDetails => ",null);
    return null;
}


const mapStateToProps = (state) => ({
    filterSelected: state.filterSelected,
    selectedTrip: state.selectedTrip,
    items: state.items,
    item: getItemDetails(state.items, state.selectedTripId),
    selectedTripId: state.selectedTripId
  })
  
  const mapDispatchToProps = (dispatch) => ({
    onTripSave: (newList) => dispatch(SaveTrip(newList)),
    onTripDelete: (id,newList) => dispatch(DeleteTrip(id, newList)),
    onTripSaveCancel: () => dispatch(SaveTripCancel())
  })

  export default connect(mapStateToProps, mapDispatchToProps)(form)
