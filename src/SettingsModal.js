import React from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InvertColorsIcon from "@material-ui/icons/InvertColors";

function SettingsModal(props) {
  const login_logout_message = () => {
    var auth = props.auth;
    var sync = props.sync;
    if (sync === "local" || auth === false) {
      return "Login";
    } else {
      return "Logout";
    }
  };

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ padding: 8, textAlign: "center" }}
      >
        Settings
      </DialogTitle>
      <DialogContent dividers style={{ padding: 10 }}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={props.handleChangeTheme}
              startIcon={<InvertColorsIcon />}
            >
              Change theme
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Box>
          <Button
            variant="contained"
            onClick={() => props.getLink(login_logout_message())}
          >
            {login_logout_message()}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsModal;