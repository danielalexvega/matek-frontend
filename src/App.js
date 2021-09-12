import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Homepage from "./homepage/page/Homepage";
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import AllProblems from "./problems/pages/AllProblems";
import NewProblem from "./problems/pages/NewProblem";
import UserProblems from "./problems/pages/UserProblems";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LearnMore from "./learn-more/pages/LearnMore";
import UpdateProblem from "./problems/pages/UpdateProblem";

import { AuthContext } from "./shared/context/auth-context";

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
          <Homepage />
        </Route>
        <Route path="/problems" exact>
          <AllProblems />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/:userId/problems" exact>
          <UserProblems />
        </Route>
        <Route path="/problems/new" exact>
          <NewProblem />
        </Route>
        <Route path="/problems/:problemId">
          <UpdateProblem />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/learn-more">
          <LearnMore />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/problems" exact>
          <AllProblems />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/learn-more">
          <LearnMore />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
