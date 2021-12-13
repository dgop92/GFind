import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { UsersCard } from "./UsersCard";
import { AnalyzeHourCard } from "./AnalyzeHourCard";
import { HourModal } from "./HourModal";

export default function Analyze() {
  const [hourModal, setHourModal] = useState({ open: false, hour: null });
  const [hoursData, setHoursData] = useState({});

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <UsersCard />
        <AnalyzeHourCard hours={hoursData.results} onHourCellClick={onHourCellClick} />
      </Box>
    </>
  );
}
