import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './color_picker.css';
const useStyles = makeStyles(theme => ({
  text_field_note_header: {
    "margin-bottom": "10px"
  }
}));


const NoteAdd= React.memo(props => {
  const classes = useStyles();
  var header_text_input;
  var body_text_input;
  var note_color="default";
  const set_header = header => {
    header_text_input = header;
  };
  const set_body = body => {
    body_text_input = body;
  };
  const set_color = (e) => {
    note_color =  e.target.value;
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
         <div className="color-picker"  onChange={set_color}>
          <input type="radio" defaultChecked name="color-pick" value="default" id="color0" />
          <label htmlFor="color0"  style={{backgroundColor: " rgba(250, 250, 250, 0.3)"}}></label>

          <input type="radio" name="color-pick"  value="#F06292" id="color1" />
          <label htmlFor="color1" style={{backgroundColor: "#F06292"}}></label>
          <input type="radio" name="color-pick"  value="#BA68C8" id="color2" />
          <label htmlFor="color2" style={{backgroundColor: "#BA68C8"}}></label>
          <input type="radio" name="color-pick"  value="#FFD54F" id="color3" />
          <label htmlFor="color3" style={{backgroundColor: "#FFD54F"}}></label>
          <input type="radio" name="color-pick"  value="#4FC3F7" id="color4" />
          <label htmlFor="color4" style={{backgroundColor: "#4FC3F7"}}></label>
          <input type="radio" name="color-pick" value="#AED581" id="color5" />
          <label htmlFor="color5" style={{backgroundColor: "#AED581"}}></label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() =>
            props.handleClickAddNote(header_text_input, body_text_input,note_color)
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
