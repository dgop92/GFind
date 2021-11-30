import React from "react";
import Box from "@mui/material/Box";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../core/Register";
import Find from "../core/Find";
import Analyze from "../core/Analyze";

export default function Main() {
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexGrow: 1, flexDirection: "column", padding: "1rem" }}
    >
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/find" element={<Find />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="*" element={<Navigate replace to="/register" />} />
      </Routes>
    </Box>
  );
}
