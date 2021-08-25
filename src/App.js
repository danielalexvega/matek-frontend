import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Homepage from "./homepage/page/Homepage";
import Users from "./user/pages/Users";
import NewProblem from "./problems/pages/NewProblem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LearnMore from "./learn-more/pages/LearnMore";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/problems/new" exact>
          <NewProblem />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/learn-more">
          <LearnMore />
        </Route>


        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
