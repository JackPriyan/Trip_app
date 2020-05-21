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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose();
  };

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
                        InputLabelProps={{
                        shrink: true
                        }}
                        InputProps={{inputProps: { min: minDate} }}
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
