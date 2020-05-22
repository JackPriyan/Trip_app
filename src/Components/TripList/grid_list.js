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

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedTrip === null || nextProps.selectedTrip === -1)
        {
            this.setState({...this.state,itemSelected : nextProps.selectedTrip});
        }
    }

    componentDidMount(){
        this.clock = setInterval(
          () => this.checkReminderClock(),
          1000
        )
      }

      checkReminderClock(){
        if(this.state.isModalOpen===false){
            const item  = this.props.tripListWithReminder.find((item) => {
                const reminderDate = new Date(item.reminderTime).getTime();
                const currentTime = new Date().getTime();
                console.log("tripListWithReminder => ",currentTime/1000 - reminderDate/1000)
                const difference = currentTime/1000 - reminderDate/1000;
                if(difference>0) {
                return item
                } 
            });
            // alert("its time!");
            if(item){
                console.log("Snooze Item",item);
                this.setState({...this.state, snoozeItem : item, isModalOpen : true});
            }
        }
    }


    render(){
        const headers = ["","Title", "Destination", "Duration", "Category", "Reminder set", "Items Needed", "Trip Planning State"];
        
        const handleChange = (name, event, itemIndex = 0) => {
            var newState;
            switch(name){
                case "rowSelected":
                    newState = {
                        ...this.state, itemSelected: this.state.itemSelected === itemIndex ? -1 : itemIndex };
                    this.props.onTripSelected(this.state.itemSelected === itemIndex ? -1 : itemIndex, this.props.items[itemIndex].id);
                    break;
                case "openReminder":
                    console.log("openReminder => ",event);
                    newState = {
                        ...this.state, isModalOpen : !this.state.isModalOpen};
                    break;
                case "snooze":
                    newState = {
                        ...this.state, isModalOpen : !this.state.isModalOpen};
                        this.setState({
                            ...newState
                        });
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
                        const newList =  this.props.items.filter((item)=>{ if(item.id !== this.state.snoozeItem.id) return item });
                        const reminderTime = new Date().getTime()+snoozeSeconds;
                        const reminderDateTime = moment(reminderTime).format("YYYY-MM-DD[T]HH:mm");

                        newList.push({
                            id: this.state.snoozeItem.id,
                            title : this.state.snoozeItem.title,
                            destination: this.state.snoozeItem.destination,
                            category: this.state.snoozeItem.category,
                            startDate: this.state.snoozeItem.startDate,
                            endDate: this.state.snoozeItem.endDate,
                            todos: this.state.snoozeItem.todos,
                            isReminderSet: this.state.snoozeItem.isReminderSet,
                            reminderTime: reminderDateTime,
                            state: this.state.snoozeItem.state,
                            duration: this.state.snoozeItem.duration
                            
                        });
                        console.log("newList => ", newList);
                        window.localStorage.setItem("TripList", JSON.stringify(newList));
                        
                        const tripListWithReminder = newList.filter((item) => {
                            if(item.isReminderSet)
                              return {id: item.id, dateTime : item.reminderTime }
                          });
                         this.props.onTripSave(newList, tripListWithReminder);
                        
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

        const itemStatus = ["Created", "In Progress", "Ready"]
        const itemType = ["","Business", "Vacation"]

        return(
                  <TableContainer component={Paper} style={{height:'100%'}}>
                    <Table aria-label="simple table" size="small" style={{ width: "auto", tableLayout: "auto" }}>
                        <TableHead style={{height:'100%', backgroundColor: '#3f51b5', color: 'white'}}>
                        <TableRow  scope="row">
                        {headers.map((header, index)=>
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
                                        onClick={(event) => handleChange("rowSelected", event, index)}
                                        scope="row">
                                <TableCell >
                                    <Checkbox
                                        checked={index === this.props.selectedTrip}
                                        onChange={(event) => handleChange("rowSelected", event, index)}
                                    />
                                </TableCell>
                                <TableCell align="right">{item.title}</TableCell>
                                <TableCell align="right">{item.destination}</TableCell>
                                <TableCell align="right">{item.duration+(item.duration > 1? " Days": " Day" )}</TableCell>
                                <TableCell align="right">{itemType[item.category]}</TableCell>
                                <TableCell align="right">{item.isReminderSet?<NotificationsActiveIcon/>:<NotificationsOffIcon/>}</TableCell>
                                <TableCell align="right">{checkDoneStatus(item.todos) === 2 ?"Done":"Yes"}</TableCell>
                                <TableCell align="right">{itemStatus[checkDoneStatus(item.todos)]}</TableCell>
                            </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                    {console.log("snoozeItem => ",this.state.snoozeItem)}
                    <AlertDialog isOpen={this.state.isModalOpen} 
                                 onClose={(event) => handleChange("snooze", event)}
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
