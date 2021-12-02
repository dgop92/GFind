/* eslint-disable import/prefer-default-export */

export const lightThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "hsla(228, 20.3%, 25.1%, 1)",
      light: "hsla(228, 20.3%, 30%, 1)",
      dark: "hsla(228, 19.6%, 20%, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "hsla(208, 37.1%, 48%, 1);",
      light: "hsla(208, 46.9%, 55.7%, 1)",
      dark: "hsla(207, 37%, 36.1%, 1)",
      contrastText: "#fff",
    },
    background: {
      default: "hsla(200, 27.3%, 97.8%, 1)",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    titleFontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
};

/* Color styles 
--main: hsla(228, 20.3%, 25.1%, 1);
--main-dk1: hsla(228, 19.6%, 20%, 1);
--main-lg1: hsla(228, 20.3%, 30%, 1);
--primary-text: hsla(0, 0%, 20%, 1);
--primary-text2: hsla(208, 29.4%, 10%, 1);
--secondary-text: hsla(0, 0%, 45.9%, 1);
--divider-color: hsla(0, 0%, 74.1%, 1);
--background: hsla(200, 27.3%, 97.8%, 1);
--constrast-text: hsla(0, 0%, 100%, 1);
--secondary-dk: hsla(207, 37%, 36.1%, 1);
--secondary: hsla(208, 37.1%, 48%, 1);
--secondary-lg: hsla(208, 46.9%, 55.7%, 1);
--card: hsla(0, 0%, 100%, 1);
*/
