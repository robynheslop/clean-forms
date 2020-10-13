import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Container } from "@material-ui/core";
import { appComponents } from "./app-ui";
const { SignUp, LogOut, LogIn, Navigation, PrivateRoute, Body } = appComponents;


function App() {
  return (
    <div className="App">
      <Navigation />
      <Container maxWidth="sm">
        <main>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/logout" component={LogOut} />
            <PrivateRoute path="/" component={Body} />
          </Switch>
        </main>
      </Container>
    </div>
  );
}

export default App;
