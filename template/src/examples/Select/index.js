import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMaterialUIController } from "context";

export default function BasicSelect() {
  const [number, setNumber] = useState(1);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const handleChange = (event) => {
    setNumber(event.target.value);
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
        <MenuItem value={1} sx={{ justifyContent: 'center' }}>1</MenuItem>
        <MenuItem value={2} sx={{ justifyContent: 'center' }}>2</MenuItem>
        <MenuItem value={3} sx={{ justifyContent: 'center' }}>3</MenuItem>
      </Select>
    </FormControl>
  );
}