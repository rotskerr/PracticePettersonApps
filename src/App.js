import React from "react";
import Auth from "./components/Auth/Auth.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import DashBoard from "./components/DashBoard/DashBoard.js";
import AgileBoard from "./components/AgileBoard/AgileBoard.js";
import "./App.css";
const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" Component={Nav} />
            <Route path="/auth" Component={Auth} />
            <Route path="/dashboard" Component={DashBoard} />
            <Route path="/agileboard" Component={AgileBoard} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
