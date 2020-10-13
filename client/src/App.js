import React from 'react';
import { appComponents } from "./app-ui";
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
    <div className={classes.root}>
      <Navigation />
    </div>
  );
}

export default App;
