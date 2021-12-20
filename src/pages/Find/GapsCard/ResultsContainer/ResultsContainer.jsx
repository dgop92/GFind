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
          variant="body1"
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

  if (gaps?.length === 0) {
    return (
      <CenteredBox>
        <Typography variant="body1" align="center" sx={{ p: 2 }}>
          Lo sentimos, no se encontró ningún hueco en común según los criterios
          proporcionados
        </Typography>
      </CenteredBox>
    );
  }

  if (preferences.view === "simple") {
    return <SimpleGapContainer gaps={gaps} showAvgSd={preferences.showAvgSd} />;
  }

  return (
    <UniTable cellClass={GapCell} extraCellProps={{ gaps: gaps, onGapCellClick }} />
  );
}

export default withCenteredBoxLoading(ResultsContainer);
