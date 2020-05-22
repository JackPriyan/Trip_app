import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AlertDialog({isOpen, onClose, minDate }) {
  const [open, setOpen] = React.useState(isOpen);
  const [selectDateTime, setDateTime] = React.useState(minDate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose(selectDateTime);
  };
  const handleChange = (name, event, itemIndex = 0) => {
    const value  = event.target.value;
    switch (name){
        case "setReminder":
            setDateTime (value);
            break;
        default:
            return;
    }
    return;
  }


  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please set the Date Time below"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
                        id="datetime-local"
                        label="Set Reminder"
                        type="datetime-local"
                        defaultValue={minDate}
                        value={selectDateTime}
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true
                        }}
                        InputProps={{inputProps: { min: minDate} }}
                        onChange={(event) => handleChange("setReminder", event)}
                    />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
