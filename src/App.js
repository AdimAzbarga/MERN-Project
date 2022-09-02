import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/componants/Users.jsx";
import NewPlace from "./places/componants/NewPlace.jsx";
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
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
