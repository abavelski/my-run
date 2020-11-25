import { hot, setConfig } from 'react-hot-loader';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Runs from './components/Runs';
import { ActivityData } from './main/db';
const { ipcRenderer } = window.require('electron')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState<ActivityData[]>([]);

  const openDialog = () => {
    ipcRenderer.invoke('import-from-file').then( function(res : ActivityData[]) {
      setActivities(res);
    } )
  }

  useEffect(() => {
      console.log('App -> useEffect');
      ipcRenderer.invoke('read-activities').then( function(res : ActivityData[]) {
        setActivities(res);
      } )
    }, []);

  return (
    <div>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Activities
          </Typography>
          <Button color="inherit" onClick={openDialog} >import</Button>
        </Toolbar>
      </AppBar>
    </div>
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Runs activities={activities} />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
} 

  setConfig({
    showReactDomPatchNotification: false
  })

  export default hot(module)(App);