import React, { useState } from "react";
import { Card } from "../../../components/Card";
import { HourModal } from "../HourModal";
import { CardTitle } from "../../../components/Text";
import { ResultsContainer } from "./ResultsContainer";
import { useHoursCard } from "./hooks";

export default function HoursCard() {
  const [hourModal, setHourModal] = useState({ open: false, hour: null });
  const { loading, hoursData } = useHoursCard();

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
