import React from "react";
import Todo from "./pages/Todo.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />

        <Route path="/todo" element={isAuthenticated ? <Todo /> : <Login />} />
        <Route path="/" element={<Navigate to="/todo" />} />
      </Routes>
    </BrowserRouter>
  );
}
