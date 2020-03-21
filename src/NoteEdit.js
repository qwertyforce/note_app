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

const NoteEdit= React.memo(props => {
  const classes = useStyles();
  var header_text_input = props.header;
  var body_text_input = props.body;
  var note_color = props.color;
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
          size="small"
          defaultValue={props.header}
          onChange={e => set_header(e.target.value)}
        />
        <TextField
          defaultValue={props.body}
          id="outlined-textarea"
          label="Note body"
          multiline
          fullWidth
          onChange={e => set_body(e.target.value)}
          variant="outlined"
        />
        <div className="color-picker"  onChange={set_color}>
          <input type="radio" defaultChecked={(note_color==="default"||note_color===undefined)?true:false} name="color-pick" value="default" id="color0" />
          <label htmlFor="color0"  style={{backgroundColor: " rgba(250, 250, 250, 0.3)"}}></label>

          <input type="radio" name="color-pick" defaultChecked={(note_color==="#F06292")?true:false} value="#F06292" id="color1" />
          <label htmlFor="color1" style={{backgroundColor: "#F06292"}}></label>
          <input type="radio" name="color-pick" defaultChecked={(note_color==="#BA68C8")?true:false} value="#BA68C8" id="color2" />
          <label htmlFor="color2" style={{backgroundColor: "#BA68C8"}}></label>
          <input type="radio" name="color-pick" defaultChecked={(note_color==="#FFD54F")?true:false} value="#FFD54F" id="color3" />
          <label htmlFor="color3" style={{backgroundColor: "#FFD54F"}}></label>
          <input type="radio" name="color-pick" defaultChecked={(note_color==="#4FC3F7")?true:false} value="#4FC3F7" id="color4" />
          <label htmlFor="color4" style={{backgroundColor: "#4FC3F7"}}></label>
          <input type="radio" name="color-pick" defaultChecked={(note_color==="#AED581")?true:false} value="#AED581" id="color5" />
          <label htmlFor="color5" style={{backgroundColor: "#AED581"}}></label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.handleClickDeleteNote}>
          Delete Note
        </Button>
        <Button
          autoFocus
          color="primary"
          onClick={() =>
            props.handleClickSaveChanges(header_text_input, body_text_input,note_color)
          }
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
},(prevProps, nextProps) =>(prevProps.open===nextProps.open))
export default NoteEdit;
