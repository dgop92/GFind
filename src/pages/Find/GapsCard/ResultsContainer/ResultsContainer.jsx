import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import SimpleGapContainer from "./SimpleGapContainer";
import { CenteredBox } from "../../../../components/CommonLayout";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../utils/constants";
import { withCenteredBoxLoading } from "../../../../components/HOC/loadings";
import { UniTable } from "../../../../components/Table";
import GapCell from "./GapCell";

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

  const gaps = gapsData.data?.gaps;

  if (preferences.view === "simple") {
    return <SimpleGapContainer gaps={gaps} />;
  }

  return (
    <UniTable cellClass={GapCell} extraCellProps={{ gaps: gaps, onGapCellClick }} />
  );
}

export default withCenteredBoxLoading(ResultsContainer);
