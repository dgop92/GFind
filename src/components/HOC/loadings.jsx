import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredBox } from "../CommonLayout";

export const withCenteredBoxLoading =
  (Component) =>
  ({ loading, ...props }) =>
    loading ? (
      <CenteredBox>
        <CircularProgress color="primary" />
      </CenteredBox>
    ) : (
      <Component {...props} />
    );
