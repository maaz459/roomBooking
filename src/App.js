
import './App.css';
import React from 'react';
import Box from './box';
import Form from './Form';
import { Route, Switch } from "react-router-dom";

function App() {
  return (<React.Fragment>
    <Switch>
      <Route path="/rooms/:name" component={Form}></Route>
      <Route exact path="/" component={Box}></Route>

    </Switch>
  </React.Fragment>

  );
}

export default App;
