import React from "react";
import Box from "@material-ui/core/Box";
import Note from "./Note";
import CircularProgress from "@material-ui/core/CircularProgress";

const NotesGrid = React.memo(
  props => {
    var notes = props.notes;
    if (props.loading_notes_from_internet === true) {
      return (
        <Box my={8} style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
    if (notes === false || notes.length === 0) {
      return null;
    }
    notes = notes.filter(
      el =>
        el.header.indexOf(props.search_query) > -1 ||
        el.body.indexOf(props.search_query) > -1
    );

    var Notes = notes.map(el => (
      <Note
        header={el.header}
        body={el.body}
        key={el.id}
        last_modified={el.last_modified}
        note_id={el.id}
        handleClick={props.handleClick}
      />
    ));

    return <Box my={8}>{Notes}</Box>;
  },
  (prevProps, nextProps) => {
    if (prevProps.loading_notes_from_internet !==nextProps.loading_notes_from_internet) {
      return false;
    }
    if (prevProps.notes.length === nextProps.notes.length) {
      for (var i = 0; i < prevProps.notes.length; i++) {
        if (
          prevProps.search_query !== nextProps.search_query ||
          prevProps.notes[i].header !== nextProps.notes[i].header ||
          prevProps.notes[i].body !== nextProps.notes[i].body ||
          prevProps.notes[i].id !== nextProps.notes[i].id ||
          prevProps.notes[i].last_modified !== nextProps.notes[i].last_modified
        ) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
);

export default NotesGrid;
