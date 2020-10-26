import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { appComponents } from "./app-ui";
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
const { Navigation } = appComponents;

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function App() {
  const classes = useStyles()
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <Navigation />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
