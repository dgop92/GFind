import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as FetchProvider } from "use-http";
import { lightThemeOptions } from "../styles/theme";
import { store } from "../state/store";

const theme = createTheme(lightThemeOptions);

const fetchOptions = { timeout: 10000, retries: 1 };

export function AppProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <FetchProvider url={process.env.REACT_APP_API_BASE} options={fetchOptions}>
          <BrowserRouter>{children}</BrowserRouter>
        </FetchProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
