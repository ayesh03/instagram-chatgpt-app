import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ContentIdeaForm from "./components/ContentIdeaForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={handleBackToLogin} onRegisterSuccess={handleLogin} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToRegister={handleRegister} />
    );
  }

  // After login success
  return (
    <div className="container">
      <ContentIdeaForm />
      <hr className="my-5" />
      <AnalyticsDashboard />
    </div>
  );
}

export default App;
