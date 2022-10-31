import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

export default function Router({ refreshUser, isLoggedIn, userInfo }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userInfo={userInfo} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home userInfo={userInfo} /> : <Auth />} />
        <Route path="/profile" element={<Profile refreshUser={refreshUser} userInfo={userInfo} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
