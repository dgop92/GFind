import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredBox } from "../CommonLayout";

export const withCenteredBoxLoading =
  (Component, sxProps = {}) =>
  ({ loading, ...props }) =>
    loading ? (
      <CenteredBox sx={sxProps}>
        <CircularProgress color="primary" />
      </CenteredBox>
    ) : (
      <Component {...props} />
    );
