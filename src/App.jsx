import React from "react";
import AppLayout from "./components/AppLayout/AppLayout";
import { AppProvider } from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

export default App;
