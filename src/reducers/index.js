
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
        case FILTERCATEGORY:
            console.log("FILTERCATEGORY triggered => ", action.category);
            console.log("FILTERCATEGORY state => ", state);

            return {...state, filterSelected: action.category, selectedTrip : -1, selectedTripId : -1};
            break;
        case SEARCHTEXT:
            console.log("SEARCHTEXT triggered => ", action.text);
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
        case SAVETRIP:
        case DELETETRIP:
            console.log("action.tripList delete => ", action.tripList)
            return {...state, items: action.tripList,selectedTrip : -1, item: null, selectedTripId :-1};
            break;
        case SAVETRIPCANCEL:
        case ADDNEWTRIP:
            return {...state , selectedTrip : -1, selectedTripId : -1}
            break;
        default:
            return state;
            break;
        return state;
    }
  }

export default Trips;