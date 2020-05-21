import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB,
    TRIPLIST,
    SAVETRIP,
    DELETETRIP,
    SAVETRIPCANCEL
  } from '../constants/ActionTypes'

export const FilterOption = category => ({ type: FILTERCATEGORY, category});

export const TripSelected = (selectedTrip, id) => ({ type: SELECTEDTRIP, selectedTrip,id});

export const SearchText = text => ({ type: SEARCHTEXT, text});

export const AddNewTrip = isNewTrip => ({ type: ADDNEWTRIP, isNewTrip});

export const SaveTrip = tripDetail => ({ type: SAVETRIP, tripDetail});

export const DeleteTrip = tripId => ({ type: DELETETRIP, tripId});

export const SaveTripCancel = () => ({ type: SAVETRIPCANCEL});


const getTripList = tripList => ({
    type: TRIPLIST,
    tripList
  })


export const getAllTrips = () => dispatch => {
    var items = [];
    items = JSON.parse(window.localStorage.getItem(TRIPDB));
    console.log("get List items => ",items)
    const tripList = items?items:[];
    dispatch(getTripList(tripList));
  }

