import React, { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import useFetch from "use-http";
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
  const [hoursData, setHoursData] = useState({ error: false, data: {} });
  const usernameData = useSelector((state) => state.analyze.usernameData);

  // no-cache is a temporal solution
  const { post, response, loading } = useFetch({ cachePolicy: "no-cache" });

  const loadHours = useCallback(
    async (body) => {
      const responseData = await post("/analyze", body);
      if (response.ok) {
        setHoursData({ error: false, data: responseData });
      } else {
        // bad requests or any random error
        setHoursData({ error: true, data: responseData });
      }
    },
    [post, response]
  );

  useEffect(() => {
    const cleanObj = pipe(getApiBodyWithoutUnwantedValues, convertCamelCaseToSnakeCase);
    const cleanBody = cleanObj(usernameData);

    if (Object.keys(cleanBody).length !== 0) {
      if ("usernames_file" in cleanBody) {
        const formDataBody = new FormData();
        Object.keys(cleanBody).forEach((keyName) => {
          appendToFormDataHelper(formDataBody, keyName, cleanBody[keyName]);
        });
        loadHours(formDataBody);
      } else {
        loadHours(cleanBody);
      }
    }
  }, [loadHours, usernameData]);

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
