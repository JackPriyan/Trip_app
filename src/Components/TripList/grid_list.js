/**
 * Below is the Trip Grid List Code
 * 
 */
import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {TripSelected} from '../../actions/action'
import { connect } from 'react-redux'
import {SaveTrip} from '../../actions/action'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import AlertDialog from '../../Components/Dialog/snoozeDialog'
import moment from 'moment'
import {ROWSELECTED,
        ITEMSTATUS ,
        OPENREMINDER, 
        ITEMTYPE, 
        GOTODETAILS, 
        SNOOZE,
        TABLEHEADERS} from '../../constants/constants'
class grid_list extends Component {

    constructor(props){
        super();
        console.log("grid_list props =>",props);
        var items =props.items? props.items: [];
        //items = JSON.parse(window.localStorage.getItem("TripList"));
        console.log("get List items => ",items)
        const initialState = {items : items?items:[], currentTime: '',reminderTime: ''}
        this.state = {...initialState, initialState : initialState, itemSelected : props.selectedTrip, items:items, isModalOpen:false, snoozeItem:null};
        console.log("get List this.state => ",this.state)
    }

    /**
     * Below is the to update state on props changes
     * 
     */
    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedTrip === null || nextProps.selectedTrip === -1)
        {
            this.setState({...this.state,itemSelected : nextProps.selectedTrip});
        }
    }

    /**
     * Below code is for the Reminder alearting system with Clock function
     * 
     */
    componentDidMount(){
        this.clock = setInterval(
          () => this.checkReminderClock(),
          1000
        )
      }

      checkReminderClock(){
          /**
           * Only called when the Modal is Close state
           */
        if(this.state.isModalOpen===false){

            //Checking the remindersList from props to compute the time to trigger
            const item  = this.props.tripListWithReminder.find((item) => {
                const reminderDate = new Date(item.reminderTime).getTime();
                const currentTime = new Date().getTime();
                console.log("tripListWithReminder => ",currentTime/1000 - reminderDate/1000)
                const difference = currentTime/1000 - reminderDate/1000;

                //When the difference becomes more than 0 the the reminder alert is triggered
                if(difference>0) {
                return item
                } 
            });
            if(item){
                //Setting the snoozeItem details for the Modal window and to open the Modal
                console.log("Snooze Item Again",item);
                this.setState({...this.state, snoozeItem : item, isModalOpen : true});
            }
        }
    }


    render(){

        //The Headers for the table
        
        /**
         * This is the handler function for the State changes from Form and other UI elements
         * @param {Name of the event} name 
         * @param {Even details from the target} event 
         * @param {The Event target index in case of an list} itemIndex 
         */
        const handleChange = (name, event, itemIndex = 0) => {
            var newState;
            switch(name){
                
                case ROWSELECTED:
                    newState = {
                        ...this.state, itemSelected: this.state.itemSelected === itemIndex ? -1 : itemIndex };
                    this.props.onTripSelected(this.state.itemSelected === itemIndex ? -1 : itemIndex, this.props.items[itemIndex].id);
                    break;
                case OPENREMINDER:
                    console.log("openReminder => ",event);
                    newState = {
                        ...this.state, isModalOpen : !this.state.isModalOpen};
                    break;
                case GOTODETAILS :
                        console.log("gotoDetails => ");
                        newState = {
                            ...this.state, isModalOpen : !this.state.isModalOpen };
                        const index = this.props.items.findIndex(i => i.id === this.state.snoozeItem.id);
                        console.log("snooze => ",event);
                        //Default close snoozes for 1 min
                        var snoozeSeconds = 60000 ;
                            var items = [];
                            //items = JSON.parse(window.localStorage.getItem("TripList"));
                            console.log("items => ", items);
                            const nextReminderTime = new Date().getTime()+snoozeSeconds;
                            const nextReminderDateTime = moment(nextReminderTime).format("YYYY-MM-DD[T]HH:mm");
    
                            const newListGoto =  this.props.items.filter((item)=>{ 
                                if(item.id === this.state.snoozeItem.id) item.reminderTime = nextReminderDateTime; return item; 
                            });
                            
                            window.localStorage.setItem("TripList", JSON.stringify(newListGoto));
                            
                            const tripListWithReminderGoto = newListGoto.filter((item) => {
                                if(item.isReminderSet)
                                  return {id: item.id, dateTime : item.reminderTime }
                              });
                              console.log("newListGoto => ", newListGoto);
                              console.log("tripListWithReminder => ", tripListWithReminderGoto);
                              this.props.onTripSelected(index, this.state.snoozeItem.id);

                             //this.props.onTripSave(this.props.items, this.props.tripListWithReminder);
                             this.setState({
                                    ...newState
                                });    
                        break;
                case SNOOZE:
                   
                    console.log("snooze => ",event);
                    //Default close snoozes for 1 min
                    var snoozeSeconds = 1000 ;
                    if(!event)
                        snoozeSeconds =60000;
                    else
                        snoozeSeconds = 60000* event*5;
                        var items = [];
                        //items = JSON.parse(window.localStorage.getItem("TripList"));
                        console.log("items => ", items);
                        const reminderTime = new Date().getTime()+snoozeSeconds;
                        const reminderDateTime = moment(reminderTime).format("YYYY-MM-DD[T]HH:mm");

                        const newList =  this.props.items.filter((item)=>{ 
                            if(item.id === this.state.snoozeItem.id) item.reminderTime = reminderDateTime; return item; 
                        });
                        

                        // newList.push({
                        //     id: this.state.snoozeItem.id,
                        //     title : this.state.snoozeItem.title,
                        //     destination: this.state.snoozeItem.destination,
                        //     category: this.state.snoozeItem.category,
                        //     startDate: this.state.snoozeItem.startDate,
                        //     endDate: this.state.snoozeItem.endDate,
                        //     todos: this.state.snoozeItem.todos,
                        //     isReminderSet: this.state.snoozeItem.isReminderSet,
                        //     reminderTime: reminderDateTime,
                        //     state: this.state.snoozeItem.state,
                        //     duration: this.state.snoozeItem.duration
                            
                        // });
                        window.localStorage.setItem("TripList", JSON.stringify(newList));
                        
                        const tripListWithReminder = newList.filter((item) => {
                            if(item.isReminderSet)
                              return {id: item.id, dateTime : item.reminderTime }
                          });
                          console.log("newList => ", newList);
                          console.log("tripListWithReminder => ", tripListWithReminder);

                         this.props.onTripSave(this.props.items, this.props.tripListWithReminder);
                         newState = {
                            ...this.state, isModalOpen : !this.state.isModalOpen, snoozeItem:null};
                            this.setState({
                                ...newState
                            });
                        return;

            }
            this.setState({
                ...newState
            });
        }

       

        const checkDoneStatus = (todos) => {
            const doneList = todos.filter(todo=> todo.isDone);
            //console.log("doneList => ",doneList.length);
            if(todos.length === doneList.length)
                return 2;
            else if(doneList.length>0)
                return 1;
            else
                return 0;
        }

        return(
                  <TableContainer component={Paper} style={{height:'100%'}}>
                    <Table aria-label="simple table" size="small" style={{ width: "auto", tableLayout: "auto" }}>
                        <TableHead style={{height:'100%', backgroundColor: '#3f51b5', color: 'white'}}>
                        <TableRow  scope="row">
                        {TABLEHEADERS.map((header, index)=>
                            <TableCell key={index} align="right" style={{color: 'white'}}>{header}</TableCell>
                        )
                        }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            this.props.items.map((item, index)=>
                            <TableRow key={index} 
                                        selected={index === this.props.selectedTrip}
                                        onClick={(event) => handleChange(ROWSELECTED, event, index)}
                                        scope="row">
                                <TableCell >
                                    <Checkbox
                                        checked={index === this.props.selectedTrip}
                                        onChange={(event) => handleChange(ROWSELECTED, event, index)}
                                    />
                                </TableCell>
                                <TableCell align="right">{item.title}</TableCell>
                                <TableCell align="right">{item.destination}</TableCell>
                                <TableCell align="right">{item.duration+(item.duration > 1? " Days": " Day" )}</TableCell>
                                <TableCell align="right">{ITEMTYPE[item.category]}</TableCell>
                                <TableCell align="right">{item.isReminderSet?<NotificationsActiveIcon/>:<NotificationsOffIcon/>}</TableCell>
                                <TableCell align="right">{checkDoneStatus(item.todos) === 2 ?"Done":"Yes"}</TableCell>
                                <TableCell align="right">{ITEMSTATUS[checkDoneStatus(item.todos)]}</TableCell>
                            </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                    {console.log("snoozeItem => ",this.state.snoozeItem)}
                    <AlertDialog isOpen={this.state.isModalOpen} 
                                 onClose={(name, event) => handleChange(name, event)}
                                 SnaoozeItem={this.state.snoozeItem}/>
                    </TableContainer>
        );
    }
}

const getFilteredList = (items, category, searchText) => {
    console.log("getFilteredList items =>",items );
    console.log("getFilteredList category =>",category );

    if(!searchText){
            switch (category) {
            case 0:
                return items
            case 1:
            case 2:
                const filteredItem = items.filter(t => {return t.category === category});
                console.log("items Filtered", filteredItem);
                return items.filter(t => {return t.category === category})
            default:
                return items;
        }
    }
    else{
        console.log("TExt chanegd => ",searchText);
        const filteredItem = items.filter((item) => {
            const Data = JSON.stringify(item.todos);
            if(item.title.includes(searchText) || Data.includes(searchText) || item.destination.includes(searchText)){
                return item;
            }  
        });

        return filteredItem;
    }
    return items;

}

const mapStateToProps = (state) => ({
    filterSelected: state.filterSelected,
    selectedTrip: state.selectedTrip,
    items: getFilteredList(state.items,state.filterSelected, state.searchText),
    tripListWithReminder:state.tripListWithReminder
  })
  
  const mapDispatchToProps = (dispatch) => ({
    onTripSelected: (selectedTrip,id) => dispatch(TripSelected(selectedTrip,id)),
    onTripSave: (newList, tripListWithReminder) => dispatch(SaveTrip(newList,tripListWithReminder)),
  })

  export default connect(mapStateToProps, mapDispatchToProps)(grid_list)
