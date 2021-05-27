import React from "react";

import "./App.css";

import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Registration from "./Registration/Registration";
import Table from "./Pages/Table";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/scoreBoard">
            <Table />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
