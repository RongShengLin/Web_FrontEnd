import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

export default function BasicSelect({ maxNumber = 3, onChange }) {
  const [number, setNumber] = useState(1);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const handleChange = (event) => {
    setNumber(event.target.value);
     onChange?.(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Number</InputLabel>
      <Select
        value={number}
        label="number"
        onChange={handleChange}
        sx={(theme) =>({
            height: 40,
            textAlign: 'center',
            backgroundColor: darkMode? theme.palette.grey[800] : theme.palette.grey[200],
            color: 'black',
            fontWeight: "bold",
        })}
        MenuProps={{
            PaperProps: {
                sx: {
                    width: "inherit",
                },
            },
        }}
      >
        {[...Array(maxNumber).keys()].map((i) => (
          <MenuItem key={i + 1} value={i + 1} sx={{ justifyContent: 'center' }}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

BasicSelect.propTypes = {
  maxNumber: PropTypes.number,
  onChange: PropTypes.func,
};