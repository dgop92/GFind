import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { lightThemeOptions } from "../styles/theme";
import { store } from "../state/store";

const theme = createTheme(lightThemeOptions);

export function AppProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  );
}
