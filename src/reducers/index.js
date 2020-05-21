
import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB,
    TRIPLIST,
    SAVETRIPCANCEL
  } from '../constants/ActionTypes'
const initialState = {addedIds:[],filterSelected : 0, items:[]};


const Trips = (state = initialState, action) => {
    switch (action.type){
        case FILTERCATEGORY:
            console.log("FILTERCATEGORY triggered => ", action.category);
            console.log("FILTERCATEGORY state => ", state);

            return {...state, filterSelected: action.category, selectedTrip : -1, selectedTripId : null};
            break;
        case SEARCHTEXT:
            console.log("SEARCHTEXT triggered => ", action.text);
            return {...state};
            break;
        case ADDNEWTRIP:
             console.log("ADDNEWTRIP triggered => ", action.isNewTrip);
             return {...state};
             break;
        case SELECTEDTRIP:
            console.log("SELECTEDTRIP triggered => ", action.selectedTrip);
            console.log("SELECTEDTRIP state => ", state);
            console.log("SELECTEDTRIP idSelected => ", action);
            if(action.selectedTrip == -1)
            return {...state, selectedTrip: action.selectedTrip, selectedTripId :null };
            else
            return {...state, selectedTrip: action.selectedTrip, selectedTripId :action.id};
            break;
        case TRIPLIST:
            return {...state, items: action.tripList};
            break;
        case SAVETRIPCANCEL:
            return {...state , selectedTripId : null}
            break;
        default:
            return state;
            break;
        return state;
    }
  }

export default Trips;