import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  text_field_note_header: {
    "margin-bottom": "10px"
  }
}));


const NoteAdd= React.memo(props => {
  const classes = useStyles();
  var header_text_input = props.header;
  var body_text_input = props.body;
  const set_header = header => {
    header_text_input = header;
  };
  const set_body = body => {
    body_text_input = body;
  };
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogContent dividers>
        <TextField
          className={classes.text_field_note_header}
          id="outlined-basic"
          variant="outlined"
          label="Note header"
          onChange={e => set_header(e.target.value)}
          size="small"
        />
        <TextField
          id="outlined-textarea"
          label="Note body"
          placeholder="Today was a beautiful day"
          onChange={e => set_body(e.target.value)}
          multiline
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() =>
            props.handleClickAddNote(header_text_input, body_text_input)
          }
          color="primary"
        >
          Add note
        </Button>
      </DialogActions>
    </Dialog>
  );
},(prevProps, nextProps) =>(prevProps.open===nextProps.open))
export default NoteAdd;
