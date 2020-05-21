
import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB
  } from '../constants/ActionTypes'

const initialState = {addedIds:[],filterSelected : 0};


const Trips = (state = initialState.addedIds, action) => {
    switch (action.type){
        case FILTERCATEGORY:
            console.log("FILTERCATEGORY triggered => ", action.category);
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
   
            break;
        default:
            return state;
        return state;
    }
  }

export default Trips;