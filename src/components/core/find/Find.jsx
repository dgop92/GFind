import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import UserModal from "./UserModal";
import CardTitle from "../../commons/CardTitle";

export default function Find() {
  const [modal, setModal] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <UserModal modal={modal} setModal={setModal} />
      <UsersCard setModal={setModal} />
      <GapsCard />
    </Box>
  );
}

function FindCardFAB({ icon, onClick = () => {} }) {
  return (
    <Fab size="small" color="secondary" sx={{ boxShadow: "none" }} onClick={onClick}>
      {icon}
    </Fab>
  );
}

function FindCardHeader({ name, icon, onClick }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2,
        }}
      >
        <CardTitle title={name} extraStyles={{ flexGrow: 1 }} />
        <FindCardFAB icon={icon} onClick={onClick} />
      </Box>
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
    </>
  );
}

function UsersCard({ setModal }) {
  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "95%",
        },
        minHeight: 300,
        borderRadius: (theme) => theme.spacing(4),
        my: 1.5,
      }}
    >
      <FindCardHeader
        name="Usuarios"
        icon={<AddIcon />}
        onClick={() => setModal(true)}
      />
    </Paper>
  );
}

function GapsCard() {
  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "95%",
        },
        minHeight: 500,
        borderRadius: (theme) => theme.spacing(4),
        my: 1.5,
      }}
    >
      <FindCardHeader name="Huecos en común" icon={<FilterAltIcon />} />
    </Paper>
  );
}
