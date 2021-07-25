import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./layout/Login";
import SignUpPage from "./layout/SignUp";
import LandingPage from "./layout/Landing";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signUp" component={SignUpPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
