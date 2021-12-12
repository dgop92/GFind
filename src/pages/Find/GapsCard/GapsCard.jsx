import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FindCardHeader } from "../FindCard";
import TableGapView from "./TableGapView";
import { FIND_ACTIONS } from "../../../state/actionTypes";
import GapModal from "../GapModal/GapModal";

export default function GapsCard() {
  const [gapsData, setGapsData] = useState({});
  const [gapModal, setGapModal] = useState({ open: false, gap: null });

  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.find.settings.preferences);

  useEffect(() => {
    fetch("testsGaps2.json")
      .then((response) => response.json())
      .then((data) => setGapsData(data));
  }, []);

  const onGapCellClicked = (gap) => {
    setGapModal({ open: true, gap: gap });
  };

  return (
    <>
      <GapModal
        open={gapModal.open}
        onClose={() => setGapModal({ open: false, gap: gapModal.gap })}
        gap={gapModal.gap}
      />
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
        {preferences.view === "simple" ? (
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
            {gapsData?.gaps?.map((gap) => (
              <GapItem key={`${gap.day_index}${gap.hour_index}`} gap={gap} showAvgSd />
            ))}
          </Box>
        ) : (
          <TableGapView gaps={gapsData?.gaps} onGapCellClicked={onGapCellClicked} />
        )}
      </Paper>
    </>
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
