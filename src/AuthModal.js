import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Grid from "@material-ui/core/Grid";
import {makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import config from './config'
const useStyles = makeStyles(theme => ({
  dialog_title: {
    padding: 8,
    textAlign: "center"
  },
  dialog_content: {
    padding: 8
  },
  dialog_actions: {
    justifyContent: "center"
  },

}));

function AuthModal(props) {
  const classes = useStyles();
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
      <DialogTitle
        id="simple-dialog-title"
        className={classes.dialog_title}
      >
        Login
      </DialogTitle>
      <DialogContent dividers className={classes.dialog_content}>
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
              color="secondary"
              onClick={props.handleSync}
              href={`${config.domain}/auth/google`}
              startIcon={
                <SvgIcon>
                  <FontAwesomeIcon icon={faGoogle} size="lg" />
                </SvgIcon>
              }
            >
              Google
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={props.handleSync}
              href={`${config.domain}/auth/github`}
              startIcon={
                <SvgIcon>
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </SvgIcon>
              }
            >
              Github
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialog_actions}>
        <Box>
          <Button variant="contained" onClick={props.handleLocal}>
            Use app without sync (data saved locally)
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
export default AuthModal;