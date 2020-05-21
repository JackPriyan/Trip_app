
import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB,
    TRIPLIST
  } from '../constants/ActionTypes'
const initialState = {addedIds:[],filterSelected : 0, items:[]};


const Trips = (state = initialState, action) => {
    switch (action.type){
        case FILTERCATEGORY:
            console.log("FILTERCATEGORY triggered => ", action.category);
            console.log("FILTERCATEGORY state => ", state);

            return {...state, filterSelected: action.category};
            break;
        case SEARCHTEXT:
            console.log("SEARCHTEXT triggered => ", action.text);

            break;
        case ADDNEWTRIP:
             console.log("ADDNEWTRIP triggered => ", action.isNewTrip);

             break;
        case SELECTEDTRIP:
            console.log("SELECTEDTRIP triggered => ", action.selectedTrip);
            console.log("FILTERCATEGORY state => ", state);
            return {...state, selectedTrip: action.selectedTrip};
            break;
        case TRIPLIST:
            return {...state, items: action.tripList};
            break;
        default:
            return state;
        return state;
    }
  }

export default Trips;