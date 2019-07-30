import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Particulier from './components/newPart/Particulier'
import EditAtelier from './components/editAtelier/editAtelier'
import ListTout from "./components/liste/liste"
import Menu from "./components/design/menu/menu"
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import NewAtelier from "./components/newAtelier/NewAtelier";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-fluid">
          <Route exact path="/" component={Menu} />
          <Route exact path="/tousLesAteliers" component={Menu} />
          <Route exact path="/Particulier" component={Menu} />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="container-fluid">
                    {/* <h2>Bienvenu sur <span id="nomProject"><span className="aingo">T</span>sara<span className="aingo">Na</span>andro</span></h2> */}
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="container">
                  </div>
                </div>
              </div>
            </div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Particulier" component={Particulier} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/newAtelier" component={NewAtelier} />
            <Route exact path="/tousLesAteliers" component={ListTout} />
            <Switch>
              <PrivateRoute exact path="/modifierAtl/:id" component={EditAtelier} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
