import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Register, Find, Analyze } from "../pages";
import { AutomaticRegister, ManualRegister } from "../pages/Register";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/register">
        <Route index element={<Register />} />
        <Route path="manual" element={<ManualRegister />} />
        <Route path="automatic" element={<AutomaticRegister />} />
      </Route>
      <Route path="/find" element={<Find />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="*" element={<Navigate replace to="/register" />} />
    </Routes>
  );
}
