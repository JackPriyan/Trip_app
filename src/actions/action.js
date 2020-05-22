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

export const SaveTrip = (tripList,tripListWithReminder) => ({ type: SAVETRIP, tripList,tripListWithReminder});

export const SaveRemiderTrips = tripList => ({ type: SAVETRIP, tripList});

export const DeleteTrip = (tripId,tripList, tripListWithReminder) => ({ type: DELETETRIP, tripId, tripList, tripListWithReminder});

export const SaveTripCancel = () => ({ type: SAVETRIPCANCEL});


const getTripList = (tripList,tripListWithReminder) => ({
    type: TRIPLIST,
    tripList,
    tripListWithReminder
  })


export const getAllTrips = () => dispatch => {
    var items = [];
    items = JSON.parse(window.localStorage.getItem(TRIPDB));
    console.log("get List items => ",items)
    const tripList = items?items:[];
    const tripListWithReminder = tripList.filter((item) => {
      if(item.isReminderSet)
        return {id: item.id, dateTime : item.reminderTime }
    });
    dispatch(getTripList(tripList, tripListWithReminder));
  }

