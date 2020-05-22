
import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB,
    TRIPLIST,
    SAVETRIPCANCEL,
    SAVETRIP,
    DELETETRIP
  } from '../constants/ActionTypes'
const initialState = {addedIds:[],filterSelected : 0, items:[]};


const Trips = (state = initialState, action) => {
    console.log("CALLED TYPE => ", action.type);
    switch (action.type){
        /**
        * Reducer to handle Filter by category 
        */
        case FILTERCATEGORY:
            return {...state, filterSelected: action.category, selectedTrip : -1, selectedTripId : -1};
        /**
        * Reducer to handle Search operation in the Trip List
        */
        case SEARCHTEXT:
            return {...state, searchText : action.text};    
        /**
        * Reducer to handle Selection operation in the Trip List
        */    
        case SELECTEDTRIP:
            console.log("SELECTEDTRIP triggered => ", action.selectedTrip);
            console.log("SELECTEDTRIP state => ", state);
            console.log("SELECTEDTRIP idSelected => ", action);
            if(action.selectedTrip === -1)
            return {...state, selectedTrip: action.selectedTrip, selectedTripId :null };
            else
            return {...state, selectedTrip: action.selectedTrip, selectedTripId :action.id};
        /**
        * Reducer to handle the Trip List
        */
        case TRIPLIST:
            console.log("action.tripList delete => ", action.tripList)
            return {...state, items: action.tripList,selectedTrip : -1, item: null, selectedTripId :-1, tripListWithReminder:action.tripListWithReminder};
         /**
        * Reducer to handle the Save and delete 
        */
        case SAVETRIP:
        case DELETETRIP:
            console.log("action.tripList delete => ", action.tripList)
            console.log("tripListWithReminder => ", action.tripListWithReminder)

            return {...state, items: action.tripList,selectedTrip : -1, item: null, selectedTripId :-1, tripListWithReminder:action.tripListWithReminder};
        /**
        * Reducer to handle the Save Cancel and Add new Trip Button in the Filter panel
        */
        case SAVETRIPCANCEL:
        case ADDNEWTRIP:
            return {...state , selectedTrip : -1, selectedTripId : -1}
        default:
            return state;
        return state;
    }
  }

export default Trips;