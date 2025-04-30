import { Autocomplete } from "@mui/material";
import styled from "styled-components";

export const StyledAutocomplete = styled(
  Autocomplete<Category, false, false, false>,
)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
    },
  },
});
