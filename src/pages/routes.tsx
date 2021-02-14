import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Home from "./Home";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
