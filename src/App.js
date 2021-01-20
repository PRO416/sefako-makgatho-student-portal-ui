import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './components/form/Form';
import Academics from './components/landingPage/Academics';
import LandingPage from './components/landingPage/LandingPage';
import Finances from './components/landingPage/Finances';
import Residence from './components/landingPage/Residence';

function App() {
  let [data, setData] = useState([]);

  const transfer = dataTransfer => setData(dataTransfer);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Form transfer={transfer}/>
          </Route>
          <Route path="/dashboard/home">
            <LandingPage studentData={data}/>
          </Route>
          <Route path="/dashboard/finances">
            <Finances studentData={data}/>
          </Route>
          <Route path="/dashboard/residence">
            <Residence studentData={data}/>
          </Route>
          <Route path="/dashboard/academics">
            <Academics studentData={data}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
