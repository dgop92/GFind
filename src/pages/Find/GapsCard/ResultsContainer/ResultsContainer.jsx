import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import TableGapView from "./TableGapView";
import SimpleGapContainer from "./SimpleGapContainer";
import { CenteredBox } from "../../../../components/CommonLayout";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../utils/constants";
import { withCenteredBoxLoading } from "../../../../components/HOC/loadings";

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

export default withCenteredBoxLoading(ResultsContainer);
