import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

export default function Router({ isLoggedIn }) {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
