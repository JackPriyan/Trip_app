import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import MenuList from '@material-ui/core/MenuList';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';

export default class filter extends Component {

    constructor(props){
        super();
        this.state = {};
        const initialState = {searchText : '', 
                                categorySelected: 0
                            };
        this.state = {...initialState, initialState : initialState};
    }

    render(){
        const itemType = ["All","Business", "Vacation"]

        const handleChange = (name, event, itemIndex = 0) => {
            const value = event.target.value; 
            var newState;
            switch(name){
                case "searchText":
                    newState = {
                        ...this.state, searchText: value};
                    break;
                case "search":
                    newState = {
                        ...this.state, search: value};
                    break;
                case "menuChange":
                    newState = {
                        ...this.state, categorySelected: itemIndex};
            }
            this.setState({...newState});
        }
        return(
            <Paper style={{height:'100%', padding: '20px'}}>
                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <TextField  id="outlined-basic" 
                            placeholder="Search.." 
                            variant="outlined" 
                            value={this.state.searchText ||''}
                            onChange={(event) => handleChange("searchText", event)}
                            style={{width:'100%'}}
                            margin="dense"/>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ marginTop:'8px'}}>
                        <Button     size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => handleChange("search", event)}
                                    style={{width:'25px', margin:'auto', paddingLeft:'0px',paddingRight:'0px'}}>
                                        <SearchIcon/>
                         </Button>
                         </div>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                <Box my={2} style={{ width: '100%'}}>
                <Button style={{ width: '100%'}}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={(event) => handleChange("addTodo", event)}>
                                    Add A Trip
                                </Button>
                </Box>
                </Grid>
                <MenuList>
                {itemType.map((item, index) => 
                    <MenuItem key={item} 
                                selected={index === this.state.categorySelected}
                                onClick={(event) => handleChange("menuChange", event, index)}>{item}</MenuItem>)}
                </MenuList>
                
            </Paper>
        );
    }
}