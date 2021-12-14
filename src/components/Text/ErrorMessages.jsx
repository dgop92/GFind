import React from "react";
import Typography from "@mui/material/Typography";

export default function ErrorMessages({ errors }) {
  return (
    <>
      {errors.map((errorMessage) => (
        <Typography
          variant="body2"
          key={errorMessage}
          align="center"
          sx={{
            color: "error.dark",
            p: 2,
          }}
        >
          {errorMessage}
        </Typography>
      ))}
    </>
  );
}
