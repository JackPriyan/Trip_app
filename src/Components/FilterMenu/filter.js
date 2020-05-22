/**
 * Below is the Filter Panel Code
 * 
 */
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import {FilterOption, SearchText, AddNewTrip} from '../../actions/action'
import { connect } from 'react-redux'
import {SEARCH, SEARCHTEXT, MENUCHANGE, ADDTODO, MENUOPTIONS }  from '../../constants/constants'

class filter extends Component {

    constructor(props){
        super();
        console.log("filter props =>",props);
        this.state = {};
        const initialState = {searchText : '', 
                                categorySelected: 0
                            };
        this.state = {...initialState, initialState : initialState};
    }

    render(){

        const handleChange = (name, event, itemIndex = 0) => {
            const value = event.target.value; 
            var newState;
            switch(name){
                case SEARCHTEXT:
                    newState = {
                        ...this.state, searchText: value};
                    break;
                case SEARCH:
                    newState = {
                        ...this.state, search: value};
                    this.props.onSearchChange(this.state.searchText);
                    break;
                case ADDTODO:
                    this.props.onAddNewTripClick();
                    break;
                case MENUCHANGE:
                    newState = {
                        ...this.state, categorySelected: itemIndex};
                    this.props.onMenuChange(itemIndex);
                    break;
                default:
                    return;
            }
            this.setState({...newState});
        }
        return(
            <Paper style={{height:'100%', padding: '20px'}}>
                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <TextField  id="search-text" 
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
                                    onClick={(event) => handleChange(SEARCH, event)}
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
                                    onClick={(event) => handleChange(ADDTODO, event)}>
                                    Add A Trip
                                </Button>
                </Box>
                </Grid>
                <MenuList>
                {MENUOPTIONS.map((item, index) => 
                    <MenuItem key={"menu"+index} 
                                selected={index === this.state.categorySelected}
                                onClick={(event) => handleChange(MENUCHANGE, event, index)}>{item}</MenuItem>)}
                </MenuList>
                
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    filterSelected: 0 
  })
  
  const mapDispatchToProps = (dispatch) => ({
    onMenuChange: selectedCategory => dispatch(FilterOption(selectedCategory)),
    onSearchChange: searchText => dispatch(SearchText(searchText)),
    onAddNewTripClick: () => dispatch(AddNewTrip(true))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(filter)
