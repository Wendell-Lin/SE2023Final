import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewItems from "./pages/ViewItems";
import UploadItems from "./pages/UploadItems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewitems" element={<ViewItems />} />
      <Route path="/uploaditems" element={<UploadItems />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;