import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FindCardHeader } from "../FindCard";
import TableGapView from "./TableGapView";
import { FIND_ACTIONS } from "../../../state/actionTypes";
import { GapModal } from "../GapModal";
import { getApiBodyWithoutUnwantedValues } from "../../../utils/helpers";
import { SimpleGapContainer } from "../SimpleGapContainer";
import { Card } from "../../../components/Card";
import { CenteredBox } from "../../../components/CommonLayout";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../utils/constants";
import { useLoadData } from "../../../hooks";

export default function GapsCard() {
  const [gapModal, setGapModal] = useState({ open: false, gap: null });

  const dispatch = useDispatch();
  const apiOptions = useSelector((state) => state.find.settings.apiOptions);
  const usernames = useSelector((state) => state.find.usernames);

  const {
    loading,
    responseData: gapsData,
    loadData,
  } = useLoadData({ path: "/results" });

  useEffect(() => {
    if (usernames.length >= 2) {
      const cleanApiOptions = getApiBodyWithoutUnwantedValues(apiOptions);
      const body = {
        usernames: usernames,
        ...cleanApiOptions,
      };
      loadData(body);
    }
  }, [apiOptions, loadData, usernames]);

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
        component="section"
        elevation={3}
        sx={{
          minHeight: 500,
        }}
      >
        <FindCardHeader
          name="Huecos en común"
          icon={<FilterAltIcon />}
          onClick={() =>
            dispatch({ type: FIND_ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: true })
          }
        />
        {loading ? (
          <CenteredBox>
            <CircularProgress color="primary" />
          </CenteredBox>
        ) : (
          <ResultsContainer gapsData={gapsData} onGapCellClick={onGapCellClick} />
        )}
      </Card>
    </>
  );
}

function ResultsContainer({ gapsData, onGapCellClick }) {
  const preferences = useSelector((state) => state.find.settings.preferences);

  if (gapsData.error) {
    return (
      <CenteredBox>
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "error.dark",
            p: 2,
          }}
        >
          {gapsData?.data?.usernames?.join(",") || UNEXPECTED_ERROR_MESSAGE}
        </Typography>
      </CenteredBox>
    );
  }

  if (preferences.view === "simple") {
    return <SimpleGapContainer gaps={gapsData.data?.gaps} />;
  }

  return <TableGapView gaps={gapsData.data?.gaps} onGapCellClick={onGapCellClick} />;
}
