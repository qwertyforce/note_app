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
  },
  header:{
    "font-weight": 600
  },
  body:{
    display:"inline"
  },
  date :{
    display:"inline",
    float: "right"
  }
}));


function convert_timestamp_to_date(timestamp) {
  let d = new Date(timestamp);
  let minutes= d.getMinutes()
  if(minutes<10){
   minutes="0"+minutes
  }
  return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()}:${minutes}` 
}

const Note = React.memo(props => {
const classes = useStyles();
const color={backgroundColor:(props.color!=="default" && props.color!==undefined)?props.color:false }
return (
    <Card className={classes.note_root} variant="outlined" square data-note-id={props.note_id} onClick={()=>props.handleClick(props.note_id)} style={color} >
    <CardActionArea >
      <CardContent className={classes.note}>
        <Typography variant="body2" className={classes.header}>
          {props.header}
          </Typography>
          <div>
          <Typography variant="body2"  className={classes.body}>
          {props.body}
        </Typography>
        <Typography variant="caption" className={classes.date}>
          {convert_timestamp_to_date(props.last_modified)}
        </Typography>
          </div>
          
      </CardContent>
      </CardActionArea>
    </Card>
  );
},(prevProps, nextProps) =>{
  return ((prevProps.header===nextProps.header)&&(prevProps.body===nextProps.body)&&(prevProps.color===nextProps.color))
})

export default Note;
