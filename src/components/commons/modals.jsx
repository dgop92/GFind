import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CardTitle from "./CardTitle";

const modalBaseStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 3,
  outline: 0,
  borderRadius: (theme) => theme.spacing(1),
};

export function BaseModal({ open, setModal, children, extraBaseStyles = {} }) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={() => setModal(false)}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={{ ...modalBaseStyle, ...extraBaseStyles }}>{children}</Box>
      </Fade>
    </Modal>
  );
}

export function ModalHeader({ title, setModal }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CardTitle title={title} extraStyles={{ flexGrow: 1 }} />
      <IconButton color="inherit" onClick={() => setModal(false)}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
