import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90
    }
  }
}));

function SnackBarNoteDeleted(props) {
  const classes = useStyles();
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={props.handleDeleteUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      message="Note deleted"
      action={action}
      autoHideDuration={6000}
      className={classes.snackbar}
    />
  );
}
export default SnackBarNoteDeleted;