import {
    FILTERCATEGORY,
    SELECTEDTRIP,
    SEARCHTEXT,
    ADDNEWTRIP,
    TRIPDB,
    TRIPLIST
  } from '../constants/ActionTypes'

export const FilterOption = category => ({ type: FILTERCATEGORY, category});

export const TripSelected = selectedTrip => ({ type: SELECTEDTRIP, selectedTrip});

export const SearchText = text => ({ type: SEARCHTEXT, text});

export const AddNewTrip = isNewTrip => ({ type: ADDNEWTRIP, isNewTrip});

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

