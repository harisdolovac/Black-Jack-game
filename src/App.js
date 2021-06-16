import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Navigation from "./Components/Navigation";
import TableData from "./Pages/TableData";
import Registration from "./Registration/Registration";

import "./App.css";

function App() {
  const [amount, setAmount] = useState(2000);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home amount={amount} setAmount={setAmount} />
          </Route>
          <Route path="/register">
            <Registration amount={amount} />
          </Route>
          <Route path="/scoreBoard">
            <TableData amount={amount} />
          </Route>
          <Route path="/registration">
            <Registration amount={amount} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
