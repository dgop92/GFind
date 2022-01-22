import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FindCardHeader } from "../FindCard";
import { FIND_ACTIONS } from "../../../state/actionTypes";
import { GapModal } from "./GapModal";
import { Card } from "../../../components/Card";
import { ResultsContainer } from "./ResultsContainer";
import { useGapCard } from "./hooks/useGapCard";

export default function GapsCard() {
  const [gapModal, setGapModal] = useState({ open: false, gap: null });
  const dispatch = useDispatch();
  const { loading, gapsData } = useGapCard();

  const onGapCellClick = (gap) => {
    setGapModal({ open: true, gap: gap });
  };

  return (
    <>
      <GapModal
        open={gapModal.open}
        onClose={() => setGapModal({ open: false, gap: gapModal.gap })}
        gap={gapModal.gap}
      />
      <Card
        sx={{
          minHeight: 500,
        }}
        data-test="find-gaps-card"
      >
        <FindCardHeader
          name="Huecos en común"
          icon={<FilterAltIcon />}
          onClick={() =>
            dispatch({ type: FIND_ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: true })
          }
        />
        <ResultsContainer
          loading={loading}
          gapsData={gapsData}
          onGapCellClick={onGapCellClick}
        />
      </Card>
    </>
  );
}
