import React, { useState } from 'react';
import PropTypes from "prop-types";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';


const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 800,
    label: '800',
  },
  {
    value: 1600,
    label: '1600',
  },
  {
    value: 2400,
    label: '2400',
  },
  {
    value: 3200,
    label: '3200',
  },
  {
    value: 4000,
    label: '4000',
  },
];


function valuetext(value) {
  return `${value}`;
}

function DiscreteSliderMarks({darkMode}) {
  const [value, setValue] = useState(4000);
  const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 8,
    '& .MuiSlider-track': {
        height: 8,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
    },
    '& .MuiSlider-rail': {
        height: 8, // 未填充部分粗細
        borderRadius: 4,
    },
    '& .MuiSlider-thumb': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSlider-markLabel': {
        color: (darkMode) ? theme.palette.white.main : theme.palette.dark.main,
    },
  }));  

  const handleSliderChange = (event, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 4000) {
      setValue(4000);
    }
  };
  return (
    <Grid container spacing={6}>
        <Grid item xs={12} md={6} xl={8}>
            <CustomSlider
                aria-label="Custom marks"
                value={value}
                getAriaValueText={valuetext}
                step={100}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={4000}
                onChange={handleSliderChange}
            />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <MuiInput
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: 4000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
    </Grid>
  );
}

DiscreteSliderMarks.propTypes = {
  darkMode: PropTypes.bool,
};

export default DiscreteSliderMarks;