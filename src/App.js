import React, { useState } from "react";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </div>
            </div>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
