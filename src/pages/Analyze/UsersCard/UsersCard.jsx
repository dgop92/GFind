import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { TextField } from "../../../components/Input";
import { CircularButton } from "../../../components/Button/buttons";

export default function UsersCard() {
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const onInputChange = () => {
    const currentFileName = inputFileRef.current.files[0].name;
    setFileName(currentFileName);
  };

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardTitle title="Usuarios" extraStyles={{ py: 2, px: 4 }} />
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
      <Box sx={{ px: 3, py: 2.5, display: "grid", gap: 2 }}>
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
        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography sx={{ fontWeight: 700 }} variant="body">
            Usuario a ignorar
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
            voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Typography>
          <TextField id="username_to_filter" name="username_to_filter " />
        </Box>
        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography sx={{ fontWeight: 700 }} variant="body">
            Usuarios extras
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
            voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Typography>
          <TextField id="extra_usernames" name="extra_usernames" />
        </Box>
      </Box>
    </Card>
  );
}
