import React from "react";
import Auth from "./Auth/Auth.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/auth" Component={Auth} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
