import React, { useState } from "react";

import "./App.css";

import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Table from "./Pages/Table";
import Navigation from "./Components/Navigation";

import SignUpTest from "./TestFire/SignUpTest";
import TableData from "./Pages/TableData";

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
            <SignUpTest amount={amount} setAmount={setAmount} />
          </Route>
          <Route path="/scoreBoard">
            {/* <Table /> */}
            <TableData amount={amount} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
