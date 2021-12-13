import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableCell, ClickableTableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { Card } from "../../../components/Card";
import { HourModal } from "../HourModal";
import { CardTitle } from "../../../components/Text";
import { getGap, getColorOfGap } from "../../../utils/gapHelpers";
import { getPercent } from "../../../utils/helpers";

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
  const [hoursData, setHoursData] = useState({});
  const usernameData = useSelector((state) => state.analyze.usernameData);

  console.log(usernameData);

  const onHourCellClick = (hour) => {
    setHourModal({ open: true, hour: hour });
  };

  useEffect(() => {
    fetch("exampleData/analizeHours.json")
      .then((response) => response.json())
      .then((data) => setHoursData(data));
  }, []);

  return (
    <>
      <HourModal
        open={hourModal.open}
        onClose={() => setHourModal({ open: false, hour: hourModal.hour })}
        hour={hourModal.hour}
        totalStudents={hoursData?.total_students}
      />
      <Card sx={{ minHeight: 500 }}>
        <CardTitle title="Analisís" extraStyles={{ py: 2, px: 4 }} />
        <UniTable
          cellClass={HourCell}
          extraCellProps={{ hours: hoursData?.results, onHourCellClick }}
        />
      </Card>
    </>
  );
}
