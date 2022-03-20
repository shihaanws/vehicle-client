import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import SignUp from "./Signup";

import Vehicles from "./Vehicles";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul> */}
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/vehicles">
            <Vehicles />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/forgot-password/:id/:token">
            <ResetPassword />
          </Route>
          {/* <Route path="/reset-password">
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
