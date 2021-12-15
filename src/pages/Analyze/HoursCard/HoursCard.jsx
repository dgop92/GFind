import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { TableCell, ClickableTableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { CenteredBox } from "../../../components/CommonLayout";
import { Card } from "../../../components/Card";
import { HourModal } from "../HourModal";
import { CardTitle, ErrorMessages } from "../../../components/Text";
import { getGap, getColorOfGap } from "../../../utils/gapHelpers";
import {
  convertCamelCaseToSnakeCase,
  getPercent,
  pipe,
  getApiBodyWithoutUnwantedValues,
  getListOfErrorsFromResponse,
  appendToFormDataHelper,
} from "../../../utils/helpers";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../utils/constants";
import { useLoadData, useDidMount } from "../../../hooks";

function HourCell({ cellData, hours, onHourCellClick }) {
  const { i, j } = cellData;
  const hour = getGap(hours, i, j);
  if (hour) {
    const hourColor = getColorOfGap(hour, "availability");
    return (
      <ClickableTableCell
        align="center"
        sx={{ backgroundColor: hourColor, borderColor: hourColor }}
        onClick={() => onHourCellClick(hour)}
      >
        {getPercent(hour?.availability)}
      </ClickableTableCell>
    );
  }
  return <TableCell />;
}

export default function HoursCard() {
  const [hourModal, setHourModal] = useState({ open: false, hour: null });
  const usernameData = useSelector((state) => state.analyze.usernameData);
  const isMount = useDidMount();

  // no-cache is a temporal solution
  const {
    loading,
    responseData: hoursData,
    loadData,
  } = useLoadData({ path: "/analyze", fetchOptions: { cachePolicy: "no-cache" } });

  useEffect(() => {
    if (!isMount) {
      const cleanObj = pipe(
        getApiBodyWithoutUnwantedValues,
        convertCamelCaseToSnakeCase
      );
      const cleanBody = cleanObj(usernameData);
      if ("usernames_file" in cleanBody) {
        const formDataBody = new FormData();
        Object.keys(cleanBody).forEach((keyName) => {
          appendToFormDataHelper(formDataBody, keyName, cleanBody[keyName]);
        });
        loadData(formDataBody);
      } else {
        loadData(cleanBody);
      }
    }
    // in the first render, i don't want to make and api call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData, usernameData]);

  const onHourCellClick = (hour) => {
    setHourModal({ open: true, hour: hour });
  };

  return (
    <>
      <HourModal
        open={hourModal.open}
        onClose={() => setHourModal({ open: false, hour: hourModal.hour })}
        hour={hourModal.hour}
        totalStudents={hoursData.data?.total_students}
      />
      <Card sx={{ minHeight: 500 }}>
        <CardTitle title="Analisís" extraStyles={{ py: 2, px: 4 }} />
        <ResultsContainer
          loading={loading}
          hoursData={hoursData}
          onHourCellClick={onHourCellClick}
        />
      </Card>
    </>
  );
}

function ResultsContainer({ loading, hoursData, onHourCellClick }) {
  if (loading) {
    return (
      <CenteredBox>
        <CircularProgress color="primary" />
      </CenteredBox>
    );
  }

  if (hoursData.error) {
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
