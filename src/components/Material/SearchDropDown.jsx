import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";

const SearchDropDown = ({
  variant,
  label,
  color,
  data,
  Name,
  disable,
  value,
  size,
  minWidth,
  handleDropDown,
  defaultValue,
  item,
}) => {
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "Overview":
          return option.value;
          break;
        case "exam_name":
          return option.value;
          break;
        case "exam_type":
          return option.value;
          break;
        case "mark_syllabus_difficulty":
          return option.value;
          break;
        default:
          return option.value;
          break;
      }
    },
  };

  const handleOnChange = (value, type) => {
    handleDropDown(value, type, item);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Stack
        spacing={1}
        className={`!w-full ${minWidth && `!min-w-[${minWidth}] sm:!min-w-0`}`}
      >
        <Autocomplete
          {...defaultProps}
          size={size}
          disabled={disable}
          disableClearable
          // sx={{ width: "fit-content" }}
          // value={value}
          defaultValue={defaultValue}
          onChange={(event, newValue) => handleOnChange(newValue, Name)}
          id="disable-close-on-select"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              sx={{ width: `${minWidth ? minWidth : "100%"}` }}
              variant={variant}
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

export default SearchDropDown;
