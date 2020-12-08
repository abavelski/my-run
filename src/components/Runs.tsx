import React from "react";
import { ActivityData } from "../main/db";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatKm, formatTime } from './formatUtils';
import Paper from '@material-ui/core/Paper';

interface RunsProps {
  activities : ActivityData[]
}

interface ActivityProps {
  a : ActivityData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

const Activity : React.FC<ActivityProps>  = ({ a }) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${a.activityId}-content`}
        id={`${a.activityId}-header`}
      >
        <Typography className={classes.heading}>{formatKm(a.stats.distance) + 'km ' + a.sport + ' ' + new Date(a.startingEpoch).toDateString() }</Typography>
      </AccordionSummary>
      <AccordionDetails style={{padding: 0}}>
        <List className={classes.root} dense={true}>
          <ListItem>
            <ListItemText primary={`Total  ${Math.round(a.stats.distance)} meters`} secondary={`Time ${formatTime(a.stats.time)}`} />
          </ListItem>
          {a.stats.one ? <ListItem>
            <ListItemText primary={`Best 1km in ${formatTime(a.stats.one)}`}/>
          </ListItem> : null}
          {a.stats.three ? <ListItem>
            <ListItemText primary={`Best 3km in ${formatTime(a.stats.three)}`}/>
          </ListItem> : null}
          {a.stats.five ? <ListItem>
            <ListItemText primary={`Best 5km in ${formatTime(a.stats.five)}`}/>
          </ListItem> : null}
          {a.stats.ten ? <ListItem>
            <ListItemText primary={`Best 10km in ${formatTime(a.stats.ten)}`}/>
          </ListItem> : null }
        </List>
      </AccordionDetails>
    </Accordion>);
} 

const Runs : React.FC<RunsProps>  = ({ activities = []})  => { 
  const classes = useStyles();
  const getContent = () => activities.length > 0 ? activities.map(a => <Activity key={a.activityId} a={a}/>) : <Paper style={{ margin: '6rem', textAlign: 'center', padding: '1rem'}}>Drop .tcx files here or press import</Paper>
  return (
      <div className={classes.root}>        
        {getContent()}
    </div>);
} 

export default Runs;