import React from "react";
import { CenteredBox } from "../CommonLayout";
import { ErrorMessage } from "./Extra";

export default function NonFieldErrors({ errors }) {
  return (
    <CenteredBox>
      {errors?.non_field_errors?.map((errorMessage, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ErrorMessage align="center" key={index}>
          {errorMessage}
        </ErrorMessage>
      ))}
    </CenteredBox>
  );
}
