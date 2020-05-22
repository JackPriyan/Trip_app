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

/**
  * The action for filtering the Trip list based on category
  * @param {*} category 
*/
export const FilterOption = category => ({ type: FILTERCATEGORY, category});

/**
 * The Action to Select a particular trip from the list and show it on the details screen
 * @param {*} selectedTrip 
 * @param {*} id 
 */
export const TripSelected = (selectedTrip, id) => ({ type: SELECTEDTRIP, selectedTrip,id});

/**
 * The Action for the search option in the filter panel
 */
export const SearchText = text => ({ type: SEARCHTEXT, text});

/**
 * 
 * @param {*} isNewTrip 
 */
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

