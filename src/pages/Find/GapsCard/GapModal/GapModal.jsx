import React from "react";
import Typography from "@mui/material/Typography";
import { BaseModal, ModalHeader } from "../../../../components/Modal";
import { getPercent } from "../../../../utils/helpers";

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
        Calidad: {getPercent(gap?.quality)}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Promedio: {gap?.avg?.toFixed(2)}
      </Typography>
      {(gap ?? false) && "sd" in gap && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          Desviación: {gap?.sd?.toFixed(2)}
        </Typography>
      )}
    </BaseModal>
  );
}
