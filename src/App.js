import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Homepage from "./homepage/page/homepage";
import Users from "./user/pages/Users";

const App = () => {
  return (
    <Router>
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/users">
        <Users />
      </Route>

      <Redirect to="/" />
    </Router>
  );
};

export default App;
