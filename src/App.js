import React from "react";
import Auth from "./components/Auth/Auth.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  DashBoard from "./components/DashBoard/DashBoard.js";
import AgileBoard from "./components/AgileBoard/AgileBoard.js";
import "./App.css";
import HomePage from "./components/HomePage/HomePage.js"
const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" Component={HomePage} />
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
