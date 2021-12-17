import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const ErrorMessage = styled((props) => <Typography variant="body2" {...props} />)(
  ({ theme }) => ({
    color: theme.palette.error.dark,
    padding: theme.spacing(1),
    paddingLeft: 0,
    fontSize: "0.8rem",
  })
);

export default ErrorMessage;
