import React, { useState, useCallback } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Authenticate from "./user/pages/Authenticate";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces.js";
import Users from "./user/pages/Users.jsx";
import NewPlace from "./places/pages/NewPlace";
import Footer from "./shared/componants/UIElements/Footer/Footer.jsx";
import MainNavegation from "./shared/componants/Navigation/MainNavigation";
import { LoginContext } from "./shared/context/LoginContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState();

  const login = useCallback((uid, name) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setName(name);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setName(null);
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
        <Route path="/auth" exact>
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <LoginContext.Provider
      value={{
        isLoggedin: isLoggedIn,
        userId: userId,
        Login: login,
        Logout: logout,
        name: name,
      }}
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
