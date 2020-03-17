import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
const useStyles = makeStyles(theme => ({
  note_root:{
    'border-top': '0px'
  },
    note:{
   padding:'10px!important'
  }    
}));


const Note = React.memo(props => {
const classes = useStyles();
return (
    <Card className={classes.note_root} variant="outlined" square data-note-id={props.note_id} onClick={()=>props.handleClick(props.note_id)}>
    <CardActionArea >
      <CardContent className={classes.note}>
        <Typography variant="body2" component="p">
          {props.header}
          <br />
          {props.body}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
},(prevProps, nextProps) =>{
  return ((prevProps.header===nextProps.header)&&(prevProps.body===nextProps.body))
})

export default Note;
