import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <CookiesProvider>
            <AppRoutes />
        </CookiesProvider>
      </div>
    </>
  );
}

export default App;