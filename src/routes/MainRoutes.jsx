import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Register, Find, Analyze } from "../pages";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/find" element={<Find />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="*" element={<Navigate replace to="/register" />} />
    </Routes>
  );
}
