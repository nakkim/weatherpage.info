import { Box, ListSubheader, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  selectedParameter: string;
  setSelectedParameter: (parameter: string) => void;
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
  const { t } = useTranslation();

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
        <ListSubheader>{t("input.currentObservations")}</ListSubheader>
        <MenuItem value={"ws_10min"}>{t("params.ws_10min")}</MenuItem>
        <MenuItem value={"wg_10min"}>{t("params.wg_10min")}</MenuItem>
        <MenuItem value={"ri_10min"} selected>
          {t("params.ri_10min")}
        </MenuItem>
        <MenuItem value={"r_1h"} selected>
          {t("params.r_1h")}
        </MenuItem>
        <MenuItem value={"t2m"}>{t("params.t2m")}</MenuItem>
        <MenuItem value={"t2mtdew"} selected>
          {t("params.t2mtdew")}
        </MenuItem>
        <MenuItem value={"dewpoint"} selected>
          {t("params.dewpoint")}
        </MenuItem>
        <MenuItem value={"vis"} selected>
          {t("params.vis")}
        </MenuItem>
        <MenuItem value={"wawa"} selected>
          {t("params.wawa")}
        </MenuItem>
        <MenuItem value={"n_man"} selected>
          {t("params.n_man")}
        </MenuItem>
        <MenuItem value={"snow_aws"} selected>
          {t("params.snow_aws")}
        </MenuItem>
        <MenuItem value={"pressure"} selected>
          {t("params.pressure")}
        </MenuItem>
        <MenuItem value={"rh"} selected>
          {t("params.rh")}
        </MenuItem>
        <ListSubheader>{t("input.dailyObservations")}</ListSubheader>
        <MenuItem value={"ws_1d"}>{t("params.ws_1d")}</MenuItem>
        <MenuItem value={"wg_1d"}>{t("params.wg_1d")}</MenuItem>
        <MenuItem value={"tmax"} selected>
          {t("params.tmax")}
        </MenuItem>
        <MenuItem value={"tmin"} selected>
          {t("params.tmin")}
        </MenuItem>
        <MenuItem value={"r_1d"} selected>
          {t("params.r_1d")}
        </MenuItem>
      </Select>
    </Box>
  );
};

export default Parameter;
