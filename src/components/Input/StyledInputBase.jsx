import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const StyledBaseInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: theme.spacing(1),
    position: "relative",
    border: `1px solid ${theme.palette.grey[500]}`,
    fontSize: 14,
    padding: 8,
  },
}));

export default StyledBaseInput;
