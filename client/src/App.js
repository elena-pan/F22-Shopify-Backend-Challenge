import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/pages/Landing";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/add" render={(props) => <Add {...props} />} />
          <Route exact path="/edit/:id" render={(props) => <Edit {...props} />} />
          <Route path="/" render={(props) => <Landing {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
