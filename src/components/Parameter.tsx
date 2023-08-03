import { Box, MenuItem, Select } from "@mui/material";
import React, { Dispatch } from "react";

interface IProps {
  selectedParameter: string;
  setSelectedParameter: Dispatch<React.SetStateAction<any>>;
}

const styles = {
  root: {
    backgroundColor: "rgba(255,255,255,0)",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    display: "flex",
    top: 50,
    zIndex: 999,
  },
};

const Parameter: React.FC<IProps> = ({selectedParameter, setSelectedParameter}) => {

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedParameter(event.target.value);
  };

  return (
    <Box sx={styles.root}>
      <Select
        data-testid="selected-parameter-value"
        sx={{
          width: 200,
          height: 24,
          backgroundColor: 'rgba(255,255,255,0.75)',
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedParameter}
        onChange={handleChange}
      >
        <MenuItem value={'t2m'}>Lämpötila</MenuItem>
        <MenuItem value={'dewpoint'} selected>Kastepiste</MenuItem>
        <MenuItem value={'rh'} selected>Suhteellinen kosteus</MenuItem>
      </Select>
    </Box>
  );
};

export default Parameter;
