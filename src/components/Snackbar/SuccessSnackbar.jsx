import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function SuccessSnackbar({ title, open, setOpen }) {
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
        variant="filled"
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {title}
      </MuiAlert>
    </Snackbar>
  );
}
