import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
 
function SnackBarAlert(props) {
  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      autoHideDuration={3000}
    >
    <Alert elevation={6} onClose={props.handleClose}  severity={props.data.severity} variant="filled">{props.data.text}</Alert>
    </Snackbar>
  );
}
export default SnackBarAlert;