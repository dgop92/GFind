import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import { Card } from "../../../components/Card";
import { FindCardHeader } from "../../Find/FindCard";
import { FreeHourModal } from "../FreeHourModal";
import { TextField } from "../../../components/Input";

export default function FreeSettingsCard() {
  const [modal, setModal] = useState(false);
  const [freeButton, setFreeButton] = useState(true);
  const [searchUserContent, setSearchUserContent] = useState("");

  const handleFreeButtonChange = () => {
    setFreeButton((s) => !s);
  };

  const handleSearchUserChange = (event) => {
    console.log(event.target.value);
    setSearchUserContent(event.target.value);
  };

  return (
    <>
      <FreeHourModal open={modal} onClose={() => setModal(false)} />
      <Card
        sx={{
          margin: (theme) => `${theme.spacing(1)} 0`,
          alignSelf: "center",
        }}
        data-test="free-hour-card"
      >
        <FindCardHeader
          name="¿Quién esta libre?"
          icon={<AddIcon />}
          onClick={() => setModal(true)}
        />
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <TextField
            name="user_to_search"
            inputBaseProps={{
              value: searchUserContent,
              onChange: handleSearchUserChange,
              placeholder: "Buscar personas",
            }}
          />
          <ToggleButton
            value="free_status"
            color="secondary"
            size="small"
            selected={freeButton}
            onChange={handleFreeButtonChange}
            sx={{ m: 1, borderRadius: 2, px: 3, width: { xs: "100%", md: "auto" } }}
          >
            Libres
          </ToggleButton>
        </Box>
      </Card>
    </>
  );
}
