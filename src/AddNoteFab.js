import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    "z-index": 9999999999
  }
}));

const FAB = React.memo(props => {
  const classes = useStyles();

  return (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.fab}
      onClick={props.handleClickOpenNoteAdd}
    >
      <AddIcon />
    </Fab>
  );
},(prevProps, nextProps) =>true)
export default FAB;