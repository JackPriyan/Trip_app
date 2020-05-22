import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { FormLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

export default function AlertDialog({isOpen, onClose, SnaoozeItem }) {
  const items = SnaoozeItem;
  const [selectSnooze, setSnooze] = React.useState(0);

  console.log("AlertDialog 13=> ", items);

  const itemStatus = ["Created", "In Progress", "Ready"]
  const itemType = ["","Business", "Vacation"]
 

  const handleClose = (name) => {
    
    //Logic for Snooze
    if(name === "goto"){
        onClose("gotoDetails",null);
    }
    else
        onClose("snooze", selectSnooze);
  };
  const handleChange = (name, event, itemIndex = 0) => {
    const value  = event.target.value;
    switch (name){
        case "snooze":
            setSnooze (value);
            break;
        default:
            return;
    }
    return;
  }


  if(items)
  return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
        <DialogActions>
          <Button onClick={()=>handleClose("save")} disabled={selectSnooze === 0} color="primary">
            Save
          </Button>
          <Button onClick={()=>handleClose("goto")} color="primary">
            Goto Details
          </Button>
          <Button onClick={()=>handleClose("close")} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
  else
  return(<div></div>)
}
