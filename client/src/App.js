import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { components } from "./app-ui";
import { Container } from "@material-ui/core"



const { Home, SignUp, LogOut, LogIn, Navigation, PrivateRoute } = components;

function App() {

  return (
    <div className="App">
      <Navigation />
      <Container maxWidth="sm">
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/logout" component={LogOut} />
          </Switch>
        </main>
      </Container>
    </div>
  );
}

export default App;
