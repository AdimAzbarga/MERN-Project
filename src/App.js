import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import UpdatePlace from "./places/pages/UpdatePlace.js";
import UserPlaces from "./places/pages/UserPlaces.js";
import Users from "./user/componants/Users.jsx";
import NewPlace from "./places/pages/NewPlace";
import Footer from "./shared/componants/UIElements/Footer/Footer.jsx";
import MainNavegation from "./shared/componants/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavegation />
      <main>
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
      </main>
      <Footer />
    </Router>
  );
};

export default App;
