import React, { useState, useCallback } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./user/pages/Authenticate";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import UserPlaces from "./places/pages/UserPlaces.js";
import Users from "./user/pages/Users.jsx";
import NewPlace from "./places/pages/NewPlace";
import Footer from "./shared/componants/UIElements/Footer/Footer.jsx";
import MainNavegation from "./shared/componants/Navigation/MainNavigation";
import { LoginContext } from "./shared/context/LoginContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <LoginContext.Provider
      value={{ isLoggedin: isLoggedIn, Login: login, Logout: logout }}
    >
      <Router>
        <MainNavegation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
