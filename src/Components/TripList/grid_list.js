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
import {getAllTrips} from '../../actions/action'

class grid_list extends Component {

    constructor(props){
        super();
        console.log("grid_list props =>",props);
        var items =props.items? props.items: [];
        //items = JSON.parse(window.localStorage.getItem("TripList"));
        console.log("get List items => ",items)
        const initialState = {items : items?items:[]}
        this.state = {...initialState, initialState : initialState, itemSelected : -1, items:items};
        console.log("get List this.state => ",this.state)
    }

    render(){
        const headers = ["","Title", "Destination", "Duration", "Category", "Reminder set", "Items Needed", "Trip Planning State"];
        
        const handleChange = (name, event, itemIndex = 0) => {
            const value = event.target.value; 
            var newState;
            switch(name){
                case "rowSelected":
                    newState = {
                        ...this.state, itemSelected: this.state.itemSelected === itemIndex ? -1 : itemIndex };
                    this.props.onTripSelected(this.state.itemSelected === itemIndex ? -1 : itemIndex);
                    break;
            }
            this.setState({...newState});
        }

        const checkDoneStatus = (todos) => {
            const doneList = todos.filter(todo=> todo.isDone);
            console.log("doneList => ",doneList.length);
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
                        <TableRow component="th" scope="row">
                        {headers.map((header)=>
                            <TableCell align="right" style={{color: 'white'}}>{header}</TableCell>
                        )
                        }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            this.state.items.map((item, index)=>
                            <TableRow key={index} 
                                        selected={index === this.state.itemSelected}
                                        onClick={(event) => handleChange("rowSelected", event, index)}
                                        component="th" scope="row">
                                <TableCell >
                                    <Checkbox
                                        checked={index === this.state.itemSelected}
                                        onChange={(event) => handleChange("rowSelected", event, index)}
                                        inputProps={{ 'aria-label': 'select all desserts' }}
                                    />
                                </TableCell>
                                <TableCell align="right">{item.title}</TableCell>
                                <TableCell align="right">{item.destination}</TableCell>
                                <TableCell align="right">{item.duration+(item.duration > 1? " Days": " Day" )}</TableCell>
                                <TableCell align="right">{itemType[item.category]}</TableCell>
                                <TableCell align="right">{item.isReminderSet.toString()}</TableCell>
                                <TableCell align="right">{checkDoneStatus(item.todos) === 2 ?"Done":"Yes"}</TableCell>
                                <TableCell align="right">{itemStatus[checkDoneStatus(item.todos)]}</TableCell>
                            </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
        );
    }
}

const getFilteredList = (items, category) => {
    console.log("getFilteredList items =>",items );
    console.log("getFilteredList category =>",category );

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
    return items;

}

const mapStateToProps = (state) => ({
    filterSelected: state.filterSelected,
    items: getFilteredList(state.items,state.filterSelected)
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getAllTrips : () => getAllTrips(),
    onTripSelected: selectedTrip => dispatch(TripSelected(selectedTrip))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(grid_list)
