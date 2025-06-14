import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { GlobalStyles } from "./styles/GlobalStyles";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/applications"
            element={
              isAuthenticated ? <ApplicationsPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
