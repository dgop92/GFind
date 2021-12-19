import React from "react";
import { ErrorMessages } from "../../../../components/Text";
import { CenteredBox } from "../../../../components/CommonLayout";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../utils/constants";
import { withCenteredBoxLoading } from "../../../../components/HOC/loadings";
import { UniTable } from "../../../../components/Table";
import HourCell from "./HourCell";
import { getListOfErrorsFromResponse } from "../../../../utils/helpers";

function ResultsContainer({ hoursData, onHourCellClick }) {
  if (hoursData.error) {
    // TODO if successful response a network error ocurrs, this will fail
    // displaying a list of string objects
    const errors =
      hoursData.data === undefined
        ? [UNEXPECTED_ERROR_MESSAGE]
        : getListOfErrorsFromResponse(hoursData.data);

    return (
      <CenteredBox>
        <ErrorMessages errors={errors} />
      </CenteredBox>
    );
  }

  return (
    <UniTable
      cellClass={HourCell}
      extraCellProps={{ hours: hoursData.data?.results, onHourCellClick }}
    />
  );
}

export default withCenteredBoxLoading(ResultsContainer);
