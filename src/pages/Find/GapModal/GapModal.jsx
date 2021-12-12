import React from "react";
import Typography from "@mui/material/Typography";
import { BaseModal, ModalHeader } from "../../../components/Modal";

function getQualityInPercent(quality) {
  if (quality) return `${(quality * 100).toFixed(2)} %`;
  return "";
}

export default function GapModal({ open, onClose, gap }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <ModalHeader
        title={`${gap?.day || "Día"} - ${gap?.hour || "Hora"}`}
        onClose={onClose}
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        Calidad: {getQualityInPercent(gap?.quality)}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Promedio: {gap?.avg.toFixed(2)}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Desviación: {gap?.sd.toFixed(2)}
      </Typography>
    </BaseModal>
  );
}
