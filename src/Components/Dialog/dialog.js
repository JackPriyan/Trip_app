import React, { useState }  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { DateTimePicker, KeyboardDateTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import MomentUtils from "@date-io/moment";
//import "moment/locale/nl";
import moment from 'moment'

export default function AlertDialog({isOpen, onClose, minDate, isSnooze = false, snoozeItem }) {
  const [selectDateTime, setDateTime] = React.useState(minDate);
  const [items] = React.useState(snoozeItem);
  const [selectSnooze, setSnooze] = React.useState(0);
  const [isSnoozeModel] = React.useState(isSnooze);

  console.log("AlertDialog 11=> ", snoozeItem);

  const itemStatus = ["Created", "In Progress", "Ready"]
  const itemType = ["","Business", "Vacation"]
  
  const handleClose = (name) => {
    
    //Logic for Snooze
    if(isSnoozeModel){
        if(selectSnooze>0)
            onClose(selectSnooze);
    }
    //Logic for normal close
    if(name === "close")
        onClose(selectDateTime);

    //Save DateTime in details form if its future date selected
    else  if(! isSnoozeModel){
        const reminderDate = new Date(selectDateTime).getTime();
        const currentTime = new Date().getTime();
        const difference = currentTime/1000 - reminderDate/1000;
        if(difference<0 )
            onClose(selectDateTime);
    }
  };
  const handleChange = (name, event, itemIndex = 0) => {
      console.log("event handleChange ",event);
    switch (name){
        case "setReminder":
            const date  = event._d;
            console.log("event SetReminder ",date);
            const dateFormat = moment(date).format("YYYY-MM-DD[T]HH:mm");
            console.log("event dateFormat ",dateFormat);

            setDateTime (dateFormat);
            break;
        case "snooze":
            const value  = event.target.value;
            setSnooze (value);
            break;
        default:
            return;
    }
    return;
  }

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        {isSnoozeModel === false &&
        <div>
        <DialogTitle id="alert-dialog-title">{"Please set the Date Time below"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{margin:'10px', color:'red'}}>{ "Please Set Future Date & Time."}</div>
          {/* <TextField
                        id="datetime-local"
                        label="Set Reminder"
                        type="datetime-local"
                        defaultValue={minDate}
                        value={selectDateTime}
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true
                        }}
                        InputProps={{inputProps: { min: minDate, pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" } }}
                        onChange={(event) => handleChange("setReminder", event)}
                        
                    /> */}
                        <MuiPickersUtilsProvider  utils={MomentUtils}>
              <KeyboardDateTimePicker
                                        variant="outlined"
                                        ampm={false}
                                        label="Set Reminder"
                                        value={selectDateTime}
                                        onChange={(event) => handleChange("setReminder", event)}
                                        onError={console.log}
                                        disablePast
                                        format="DD/MM/YYYY - H:mm"
                                    />
                        </MuiPickersUtilsProvider>
          </DialogContentText>
        
        </DialogContent>
        </div>
        }

        {isSnoozeModel === true && items &&
        <div>
        <DialogTitle id="alert-dialog-title"> <NotificationsActiveIcon/>{" Reminder "}</DialogTitle>
        <DialogContent  style={{width:'20rem'}}>
          <DialogContentText id="alert-dialog-description">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >Title</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {items.title}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >Destination</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {items.destination}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >Category</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {itemType[items.category]}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >Start Date</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {items.startDate}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >End Date</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {items.endDate}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel >Status</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel > {itemStatus[items.category]}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel > Snooze</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" style={{width: '100%', textAlign:'left', alignContent:'left'}}>
                            <Select id="demo-simple-select-outlined"
                                    value={selectSnooze}
                                    onChange={(event) => handleChange("snooze", event)}
                                    margin="dense">
                            <MenuItem value={0}>
                                None
                            </MenuItem>
                            <MenuItem value={1}>5 Mins</MenuItem>
                            <MenuItem value={2}>10 Mins</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
          </DialogContentText>
        
        </DialogContent>
        </div>
        }
        <DialogActions>
          <Button onClick={()=>handleClose("save")} disabled={isSnooze && selectSnooze === 0} color="primary">
            Save
          </Button>
          <Button onClick={()=>handleClose("close")} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
