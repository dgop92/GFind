import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useDispatch } from "react-redux";
import { Card } from "../../../components/Card";
import { SecondaryButton } from "../../../components/Button";
import { CardTitle } from "../../../components/Text";
import { TextField } from "../../../components/Input";
import { CircularButton } from "../../../components/Button/buttons";
import { ANALYZE_ACTIONS } from "../../../state/actionTypes";

export default function UsersCard() {
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();

  const onInputChange = () => {
    const currentFileName = inputFileRef.current.files[0].name;
    setFileName(currentFileName);
  };

  const handleSubmit = (event) => {
    const usernameFile = event.target.usernames_file.files[0];
    const usernameToFiler = event.target.username_to_filter.value;
    const extraUsernames = event.target.extra_usernames.value.split(",");
    dispatch({
      type: ANALYZE_ACTIONS.UPDATE_USERNAMES_DATA,
      payload: { usernameFile, usernameToFiler, extraUsernames },
    });
    event.preventDefault();
  };

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardTitle title="Usuarios" extraStyles={{ py: 2, px: 4 }} />
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />

      <Box
        sx={{ px: 3, py: 2.5, display: "grid", gap: 2 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "grid", gap: 1, flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 700 }} variant="body">
              Archivo de Usuarios
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
              voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Minus, ipsam.
            </Typography>
            <Typography variant="body2">Archivo seleccionado: {fileName}</Typography>
          </Box>
          <Box sx={{ mx: 1.5, display: "flex", alignItems: "center" }}>
            <input
              ref={inputFileRef}
              name="usernames_file"
              type="file"
              accept=".txt"
              hidden
              onChange={onInputChange}
            />
            <CircularButton
              onClick={() => inputFileRef.current && inputFileRef.current.click()}
            >
              <InsertDriveFileIcon />
            </CircularButton>
          </Box>
        </Box>
        <UserInputContainer title="Usuario a ignorar" id="username_to_filter">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
          voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </UserInputContainer>
        <UserInputContainer title="Usuarios extras" id="extra_usernames">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
          voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </UserInputContainer>
        <SecondaryButton type="submit" sx={{ mt: 2 }}>
          Analizar
        </SecondaryButton>
      </Box>
    </Card>
  );
}

function UserInputContainer({ title, children, id, name = id }) {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography sx={{ fontWeight: 700 }} variant="body">
        {title}
      </Typography>
      <Typography variant="body2">{children}</Typography>
      <TextField id={id} name={name} />
    </Box>
  );
}
