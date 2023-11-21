import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;