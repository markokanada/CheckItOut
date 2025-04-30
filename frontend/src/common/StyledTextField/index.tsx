import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
    },
  },
});
