import { Box, ListSubheader, MenuItem, Select } from "@mui/material";
import React, { Dispatch } from "react";

interface IProps {
  selectedParameter: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const Parameter: React.FC<IProps> = ({
  selectedParameter,
  setSelectedParameter,
}) => {
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
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedParameter}
        onChange={handleChange}
      >
        <ListSubheader>Hetkellishavainnot</ListSubheader>
        <MenuItem value={"ws_10min"}>Keskituuli</MenuItem>
        <MenuItem value={"wg_10min"}>Maksimipuuska</MenuItem>
        <MenuItem value={"ri_10min"} selected>
          Sateen intensiteetti
        </MenuItem>
        <MenuItem value={"r_1h"} selected>
          Tunnin sadekertymä
        </MenuItem>
        <MenuItem value={"t2m"}>Lämpötila</MenuItem>
        <MenuItem value={"t2mtdew"} selected>
          Kastepiste-ero
        </MenuItem>
        <MenuItem value={"dewpoint"} selected>
          Kastepiste
        </MenuItem>
        <MenuItem value={"vis"} selected>
          Näkyvyys
        </MenuItem>
        <MenuItem value={"wawa"} selected>
          Vallitseva sää
        </MenuItem>
        <MenuItem value={"n_man"} selected>
          Kokonaispilvisyys
        </MenuItem>
        <MenuItem value={"snow_aws"} selected>
          Lumensyvyys
        </MenuItem>
        <MenuItem value={"pressure"} selected>
          Ilmanpaine
        </MenuItem>
        <MenuItem value={"r_1d"} selected>
          Vrk:n sadekertymä
        </MenuItem>
        <MenuItem value={"rh"} selected>
          Suhteellinen kosteus
        </MenuItem>
        <ListSubheader>Vuorokausiarvot</ListSubheader>
        <MenuItem value={"ws_1d"}>Kovin keskituuli</MenuItem>
        <MenuItem value={"wg_1d"}>Kovin puuska</MenuItem>
        <MenuItem value={"tmax"} selected>
          Ylin lämpötila
        </MenuItem>
        <MenuItem value={"tmin"} selected>
          Alin lämpötila
        </MenuItem>
      </Select>
    </Box>
  );
};

export default Parameter;
