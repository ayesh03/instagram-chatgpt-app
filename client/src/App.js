import React from "react";
import ContentIdeaForm from "./components/ContentIdeaForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <div className="container">
      <ContentIdeaForm />
      <hr className="my-5" />
      <AnalyticsDashboard />
    </div>
  );
}

export default App;
