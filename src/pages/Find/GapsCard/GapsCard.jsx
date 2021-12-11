import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FindCardHeader } from "../FindCard";
import { FIND_ACTIONS } from "../../../state/actionTypes";

export default function GapsCard() {
  const dispatch = useDispatch();

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
      <FindCardHeader
        name="Huecos en común"
        icon={<FilterAltIcon />}
        onClick={() =>
          dispatch({ type: FIND_ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: true })
        }
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(250px, 1fr))",
            md: "repeat(auto-fill, minmax(350px, 1fr))",
          },
          mx: 2,
          my: 2,
        }}
      >
        <GapItem
          gap={{
            day: "Martes",
            hour: "1:30 PM",
            avg: 1,
            day_index: 1,
            hour_index: 7,
            sd: 0,
          }}
          showAvgSd
        />
      </Box>
    </Paper>
  );
}

function GapItem({ gap, showAvgSd = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        m: 1,
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="body1">
        {gap.day} - {gap.hour}
      </Typography>
      {showAvgSd && (
        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
          Avg: {gap.avg.toFixed(2)} - Sd: {gap.sd.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}
