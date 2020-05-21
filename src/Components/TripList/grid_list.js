import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class grid_list extends Component {

    constructor(props){
        super();
        var items = [];
        items = JSON.parse(window.localStorage.getItem("TripList"));
        console.log("get List items => ",items)
        const initialState = {items : items?items:[]}
        this.state = {...initialState, initialState : initialState};
    }

    render(){
        const headers = ["Title", "Destination", "Duration", "Category", "Reminder set", "Items Needed", "Trip Planning State"];
        return(
                  <TableContainer component={Paper} style={{height:'100%'}}>
                    <Table aria-label="simple table" style={{ width: "auto", tableLayout: "auto" }}>
                        <TableHead style={{height:'100%', backgroundColor: '#3f51b5', color: 'white'}}>
                        <TableRow>
                        {headers.map((header)=>
                            <TableCell align="right" style={{color: 'white'}}>{header}</TableCell>
                        )
                        }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            this.state.items.map((item, index)=>
                            <TableRow key={index}>
                                <TableCell align="right" component="th" scope="row" width={150}>{item.title}</TableCell>
                                <TableCell align="right" component="th" scope="row" width={150}>{item.destination}</TableCell>
                                <TableCell align="right" >{item.duration+(item.duration > 1? " Days": " Day" )}</TableCell>
                                <TableCell align="right">{item.category}</TableCell>
                                <TableCell align="right">{item.isReminderSet.toString()}</TableCell>
                                <TableCell align="right">{item.todos && item.todos.length ? true.toString(): false.toString()}</TableCell>
                                <TableCell align="right">{item.todos && item.todos.length ? true.toString(): false.toString()}</TableCell>
                            </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
        );
    }
}