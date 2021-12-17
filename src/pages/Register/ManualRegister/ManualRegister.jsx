import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useFetch from "use-http";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredBox } from "../../../components/CommonLayout";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { ClickableTableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { TextField, NonFieldErrors } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { useForm } from "../../../hooks/useForm";
import { isEmpty } from "../../../utils/validators";
import { SuccessSnackbar } from "../../../components/Snackbar";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../utils/constants";

function RegisterCell({ cellData, onCellClick, selectedHours }) {
  const { i, j } = cellData;
  let sxProps = {};
  if (`${i}${j}` in selectedHours) {
    sxProps = {
      backgroundColor: (theme) => theme.palette.primary.light,
      borderColor: (theme) => theme.palette.primary.light,
    };
  }
  return <ClickableTableCell onClick={() => onCellClick([i, j])} sx={sxProps} />;
}

function getIndicesFromSelectedHours(selectedHours) {
  return Object.keys(selectedHours).map((s) => [Number(s[0]), Number(s[1])]);
}

export default function ManualRegister() {
  const [selectedHours, setSelectedHours] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  const onCellClick = (position) => {
    const [i, j] = position;
    const newKey = `${i}${j}`;
    setSelectedHours((oldSelectedHours) => {
      if (newKey in oldSelectedHours) {
        const { [newKey]: deletedKey, ...newSelectedHours } = oldSelectedHours;
        return newSelectedHours;
      }
      return {
        ...oldSelectedHours,
        [`${i}${j}`]: true,
      };
    });
  };

  const { post, loading, response } = useFetch();

  const { register, handleSubmit, errors, setErrors, clearInputs } = useForm({
    commonValidators: [isEmpty],
  });

  const onSubmit = async (data) => {
    const bodyData = {
      list_of_indices: getIndicesFromSelectedHours(selectedHours),
      ...data,
    };
    const resData = await post("/automatic", bodyData);
    if (resData === undefined) {
      // no response from server or timeout
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    } else if (response.status === 201) {
      clearInputs();
      setSuccessModal(true);
    } else if (response.status === 400) {
      if ("list_of_indices" in resData) {
        const oldArr = resData.non_field_errors || [];
        setErrors({
          ...resData,
          non_field_errors: [...oldArr, ...resData.list_of_indices],
        });
      } else {
        setErrors(resData);
      }
    } else {
      // TODO snackbar
      console.log("500 error or something else");
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    }
  };

  return (
    <>
      <SuccessSnackbar
        open={successModal}
        setOpen={setSuccessModal}
        title="Registro exitoso"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardTitle title="Selecciona tu horario" extraStyles={{ py: 2, px: 4 }} />
          <Divider
            sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }}
          />

          <UniTable
            cellClass={RegisterCell}
            extraCellProps={{ onCellClick, selectedHours }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              p: 2,
              px: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Usuario"
              name="username"
              inputBaseProps={{ autoComplete: "username", inputRef: register() }}
              errorMessages={errors?.username}
            />
            {loading ? (
              <CenteredBox sx={{ mt: 6, mb: 2 }}>
                <CircularProgress color="primary" />
              </CenteredBox>
            ) : (
              <Box sx={{ mt: 2, width: "100" }}>
                <SecondaryButton fullWidth type="submit">
                  Aceptar
                </SecondaryButton>
                {"non_field_errors" in errors && <NonFieldErrors errors={errors} />}
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}
