import React from "react";
import Typography from "@mui/material/Typography";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { getPercent } from "../../../utils/helpers";
import { DAYS, HOURS } from "../../../utils/constants";

export default function HourModal({ open, onClose, hour, totalStudents }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <ModalHeader
        title={`${DAYS[hour?.day_index] || "Día"} - ${
          HOURS[hour?.hour_index] || "Hora"
        }`}
        onClose={onClose}
      />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Disponibilidad: {getPercent(hour?.availability)}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Número de estudiantes disponibles: {hour?.number_of_students}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Total estudiantes: {totalStudents}
      </Typography>
    </BaseModal>
  );
}
