import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import GamePage from "./gamePage/GamePage";
import ScorePage from "./scorePage/ScorePage";
import AlertNotification from "./shared/components/AlertNotification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/game" element={<GamePage />} />
          <Route exact path="/home" element={<ScorePage />} />
          <Route exact path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
